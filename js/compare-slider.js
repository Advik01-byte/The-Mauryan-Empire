/* =====================================================
   War-to-Peace slider (the second "hard" script).
   Drag the golden bar, use the arrow keys, or press the
   War / Split / Peace buttons. If this file is deleted the
   slider still works with the buttons (CSS only).
   ===================================================== */
(function () {
  var frame = document.querySelector('.js-compare');
  if (!frame) return;
  var wrap = frame.closest('.compare');
  var handle = frame.querySelector('.js-compare-handle');
  var radios = wrap.querySelectorAll('input[name="cmp"]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var pos = 50;        // where the bar is now (0 = all peace, 100 = all war)
  var target = 50;     // where it is heading
  var frameId = 0;     // requestAnimationFrame id
  var dragging = false;
  var touched = false; // true once the person uses the slider

  wrap.classList.add('has-js');

  function clamp(v) { return Math.max(0, Math.min(100, v)); }

  function paint() {
    frame.style.setProperty('--pos', pos + '%');
    var war = Math.round(pos);
    handle.setAttribute('aria-valuenow', war);
    handle.setAttribute('aria-valuetext', war + '% war, ' + (100 - war) + '% peace');
  }

  // glide towards the target a little each frame (easing)
  function glide() {
    pos += (target - pos) * 0.16;
    if (Math.abs(target - pos) < 0.15) { pos = target; frameId = 0; } else { frameId = requestAnimationFrame(glide); }
    paint();
  }

  function moveTo(value, instant) {
    target = clamp(value);
    if (instant || reduce) {
      if (frameId) { cancelAnimationFrame(frameId); frameId = 0; }
      pos = target; paint(); return;
    }
    if (!frameId) frameId = requestAnimationFrame(glide);
  }

  function percentFromX(x) {
    var r = frame.getBoundingClientRect();
    return ((x - r.left) / r.width) * 100;
  }

  function clearPresets() { radios.forEach(function (r) { r.checked = false; }); }

  // ----- dragging with mouse, finger or pen -----
  frame.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true; touched = true;
    frame.classList.add('is-dragging');
    frame.setPointerCapture(e.pointerId);
    clearPresets();
    moveTo(percentFromX(e.clientX), false);
  });
  frame.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    moveTo(percentFromX(e.clientX), true);   // follow the pointer exactly
  });
  function stop(e) {
    if (!dragging) return;
    dragging = false;
    frame.classList.remove('is-dragging');
    if (frame.hasPointerCapture && frame.hasPointerCapture(e.pointerId)) frame.releasePointerCapture(e.pointerId);
  }
  frame.addEventListener('pointerup', stop);
  frame.addEventListener('pointercancel', stop);
  frame.addEventListener('lostpointercapture', stop);

  // ----- keyboard (the handle is a slider) -----
  handle.addEventListener('keydown', function (e) {
    var step = e.shiftKey ? 15 : 5, v = null;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') v = target - step;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') v = target + step;
    else if (e.key === 'PageDown') v = target - 25;
    else if (e.key === 'PageUp') v = target + 25;
    else if (e.key === 'Home') v = 0;
    else if (e.key === 'End') v = 100;
    if (v === null) return;
    e.preventDefault(); touched = true; clearPresets(); moveTo(v, false);
  });

  // ----- War / Split / Peace buttons -----
  radios.forEach(function (r) {
    r.addEventListener('change', function () { touched = true; moveTo(Number(r.dataset.pos), false); });
  });

  // ----- a little demo the first time the slider scrolls into view -----
  if ('IntersectionObserver' in window && !reduce) {
    var seen = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      seen.disconnect();
      var steps = [[500, 22], [1500, 78], [2600, 50]];
      steps.forEach(function (s) {
        setTimeout(function () { if (!touched) moveTo(s[1], false); }, s[0]);
      });
    }, { threshold: 0.35 });
    seen.observe(frame);
  }

  paint();
})();
