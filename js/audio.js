// ONE central audio manager for the whole site: background music, every sound effect and the Sound button.
// To change a sound or its volume, edit the two tables below. Nothing else needs touching.
// Browser rules respected: nothing plays until the visitor's first click, tap or key press.

const MUSIC = { src: 'audio/background-music.mp3', volume: 0.12 };

// name: [file, volume, minimum ms before the same sound may play again]
const SFX = {
  lamp:      ['audio/light-the-lamp.mp3',       0.65, 400],
  palace:    ['audio/palace-menu-opening.mp3',  0.50, 600],
  nav:       ['audio/navigation-click.mp3',     0.35, 200],
  flip:      ['audio/flip-card.mp3',            0.40, 350],
  timeline:  ['audio/timeline-filter.mp3',      0.40, 250],
  ruler:     ['audio/ruler-and-map-city.mp3',   0.40, 400],
  city:      ['audio/ruler-and-map-city.mp3',   0.55, 400],
  scrolls:   ['audio/opening-scrolls.mp3',      0.40, 300],
  edict:     ['audio/ashokas-edicts.mp3',       0.45, 450],
  pillar:    ['audio/mauryan-pillar.mp3',       0.50, 400],
  coin:      ['audio/punch-marked-coin.mp3',    0.55, 400],
  wheel:     ['audio/dharma-wheel.mp3',         0.55, 400],
  page:      ['audio/handbook-page-turn.mp3',   0.45, 300],
  correct:   ['audio/quiz-correct.mp3',         0.65, 200],
  incorrect: ['audio/quiz-incorrect.mp3',       0.35, 200],
  reveal:    ['audio/reveal-fact.mp3',          0.55, 400],
  backtop:   ['audio/navigation-click.mp3',     0.35, 400],  // no separate file supplied: reuses the navigation click
  button:    ['audio/navigation-click.mp3',     0.30, 200]   // no separate file supplied: reuses the navigation click
};

const canHover = window.matchMedia('(hover: hover)').matches;
const AudioCtx = window.AudioContext || window.webkitAudioContext;
// Web Audio gives exact volumes on phones (iPhones ignore <audio>.volume) but cannot read local files,
// so it is used when the site is served over http(s); opened straight from a folder it falls back to <audio>.
const useWebAudio = !!AudioCtx && /^https?:$/.test(location.protocol);

let enabled = true;
try { enabled = sessionStorage.getItem('sound') !== 'off'; } catch (e) { /* storage blocked: stay on */ }
let unlocked = false;       // true after the first real interaction
let musicStarted = false;
let lastAny = 0;
const lastPlayed = {};
const voices = {};          // the one voice each effect may use

/* ---------- backend A: Web Audio ---------- */
let ctx = null;
const raw = {};             // downloaded files
const decoded = {};         // decoded buffers
let musicNode = null;

function fetchFile(src) {
  if (!raw[src]) raw[src] = fetch(src).then((r) => r.arrayBuffer()).catch(() => null);
  return raw[src];
}
function getBuffer(src) {
  if (!decoded[src]) {
    decoded[src] = fetchFile(src).then((data) => (data && ctx ? ctx.decodeAudioData(data) : null)).catch(() => null);
  }
  return decoded[src];
}

/* ---------- backend B: <audio> elements ---------- */
const music = new Audio();
const tags = {};
function tagFor(name) {
  if (!tags[name]) {
    tags[name] = new Audio(SFX[name][0]);
    tags[name].preload = 'auto';
    tags[name].volume = SFX[name][1];
  }
  return tags[name];
}

/* ---------- music ---------- */
function startMusic() {
  if (musicStarted || !enabled || !unlocked) return;
  if (useWebAudio) {
    if (!ctx) ctx = new AudioCtx();
    musicStarted = true;
    ctx.resume().catch(() => { musicStarted = false; });
    getBuffer(MUSIC.src).then((buffer) => {
      if (!buffer) { musicStarted = false; return; }
      const gain = ctx.createGain();
      gain.gain.value = MUSIC.volume;
      musicNode = ctx.createBufferSource();
      musicNode.buffer = buffer;
      musicNode.loop = true;
      musicNode.connect(gain).connect(ctx.destination);
      musicNode.start();
      if (!enabled) ctx.suspend();
    });
  } else {
    music.src = MUSIC.src;
    music.loop = true;
    music.volume = MUSIC.volume;
    music.play().then(() => { musicStarted = true; }).catch(() => { /* blocked: retry on the next interaction */ });
  }
}

/* ---------- sound effects ---------- */
function stopVoice(name) {
  const v = voices[name];
  if (!v) return;
  try { v.stop(); } catch (e) { /* already ended */ }
  delete voices[name];
}
function stopAllEffects() {
  Object.keys(voices).forEach(stopVoice);
  Object.keys(tags).forEach((n) => { tags[n].pause(); tags[n].currentTime = 0; });
}

function play(name) {
  if (!enabled || !unlocked || !SFX[name]) return;
  const now = performance.now();
  if (now - (lastPlayed[name] || 0) < SFX[name][2]) return;   // same sound: no stutter, no stacking
  if (now - lastAny < 60) return;                              // two events for one action: only the first sounds
  lastPlayed[name] = lastAny = now;
  const [src, volume] = SFX[name];
  if (useWebAudio) {
    if (!ctx) return;
    getBuffer(src).then((buffer) => {
      if (!buffer || !enabled) return;
      stopVoice(name);
      const node = ctx.createBufferSource();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      node.buffer = buffer;
      node.connect(gain).connect(ctx.destination);
      node.onended = () => { if (voices[name] === node) delete voices[name]; };
      voices[name] = node;
      node.start();
    });
  } else {
    const tag = tagFor(name);
    tag.currentTime = 0;
    tag.play().catch(() => {});
  }
}

/* ---------- Sound on / off ---------- */
const soundButton = document.querySelector('.js-sound');
function showState() {
  soundButton.setAttribute('aria-pressed', String(enabled));
  const label = enabled ? 'Sound on. Click to mute' : 'Sound off. Click to turn on';
  soundButton.setAttribute('aria-label', label);
  soundButton.title = label;
}
function setEnabled(on) {
  enabled = on;
  try { sessionStorage.setItem('sound', on ? 'on' : 'off'); } catch (e) { /* ignore */ }
  showState();
  if (!on) {
    stopAllEffects();
    if (useWebAudio && ctx) ctx.suspend();     // freezes the music where it is
    else music.pause();
  } else if (!musicStarted) {
    startMusic();
  } else if (useWebAudio && ctx) {
    ctx.resume();                              // carries on from the same spot, no restart
  } else {
    music.play().catch(() => {});
  }
}
showState();
soundButton.addEventListener('click', () => { unlocked = true; setEnabled(!enabled); });

// Pause while the tab is hidden (saves battery on phones), carry on when it is back.
document.addEventListener('visibilitychange', () => {
  if (!musicStarted || !enabled) return;
  if (document.hidden) {
    if (useWebAudio && ctx) ctx.suspend(); else music.pause();
  } else if (useWebAudio && ctx) ctx.resume(); else music.play().catch(() => {});
});

/* ---------- first interaction unlocks audio ---------- */
function unlock() {
  unlocked = true;
  if (useWebAudio) { if (!ctx) ctx = new AudioCtx(); if (enabled) ctx.resume().catch(() => {}); }
  startMusic();
  if (musicStarted) ['pointerup', 'keydown', 'touchend', 'click'].forEach((t) => document.removeEventListener(t, unlock, true));
}
['pointerup', 'keydown', 'touchend', 'click'].forEach((t) => document.addEventListener(t, unlock, true));
if (useWebAudio) {   // start downloading now so the first sounds are instant
  [MUSIC.src, ...Object.values(SFX).map((s) => s[0])].forEach((s) => fetchFile(s));
}

/* ---------- which interaction makes which sound ---------- */
const hit = (e, selector) => e.target.closest && e.target.closest(selector);

document.addEventListener('click', (e) => {
  if (hit(e, '.js-sound')) return;
  const touchOrKey = !canHover || e.detail === 0;   // with a mouse, hovering already made the sound
  if (hit(e, '.js-to-top')) return play('backtop');
  if (hit(e, '.js-flip-all, .js-unflip-all')) return play('flip');
  if (hit(e, '.js-open-all, .js-close-all')) return play('scrolls');
  if (hit(e, '.js-fact-button')) return play('reveal');
  if (hit(e, '.js-filter')) return play('timeline');
  if (hit(e, '.city')) return play('city');
  if (hit(e, '.flip')) return touchOrKey ? play('flip') : undefined;
  if (hit(e, '.tablet')) return touchOrKey ? play('edict') : undefined;
  if (hit(e, '.menu a, nav .brand')) return play('nav');
  if (hit(e, 'button')) return play('button');
});

document.addEventListener('change', (e) => {
  const input = e.target;
  if (input.id === 'torch') return play('lamp');
  if (input.matches('.handbook > input')) return play('page');
  if (input.matches('.tabs > input, .eras > input')) return play('ruler');
  if (input.matches('.quiz input.ok')) return play('correct');
  if (input.matches('.quiz input.no')) return play('incorrect');
});

// Cards and tablets answer to the mouse pointer arriving on them.
document.addEventListener('mouseover', (e) => {
  if (!canHover) return;
  const card = hit(e, '.flip, .tablet');
  if (!card || card.contains(e.relatedTarget)) return;
  play(card.classList.contains('flip') ? 'flip' : 'edict');
});

// Opening a scroll (Life in the Empire). The "toggle" event does not bubble, so listen while it travels down.
document.addEventListener('toggle', (e) => {
  if (e.target.matches && e.target.matches('details') && e.target.open) play('scrolls');
}, true);

// The menu and the three treasures open through the address bar (#menu, #art1 ...).
const hashSounds = { '#menu': 'palace', '#art1': 'pillar', '#art2': 'coin', '#art3': 'wheel' };
window.addEventListener('hashchange', () => {
  const name = hashSounds[location.hash];
  if (name) play(name);
});

// Dragging the War / Peace slider, and turning a handbook page by dragging, do not fire normal clicks.
let dragStart = null;
document.addEventListener('pointerdown', (e) => {
  dragStart = { x: e.clientX, y: e.clientY, slider: !!hit(e, '.cmp-frame'), book: !!hit(e, '.book') };
});
document.addEventListener('pointerup', (e) => {
  if (!dragStart) return;
  const moved = Math.hypot(e.clientX - dragStart.x, e.clientY - dragStart.y) > 12;
  if (dragStart.book && moved) play('page');     // a plain click on a page is heard through its change event
  dragStart = null;
});
