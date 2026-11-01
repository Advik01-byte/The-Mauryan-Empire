// Hero banner: typing tagline and a random "Did you know?" fact.
const tagline = document.querySelector('.tag');
const fullText = tagline.textContent;
tagline.textContent = '';
let letters = 0;
const prefersLessMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersLessMotion) {
  tagline.textContent = fullText;
} else {
  // wait for the opening splash to finish, then type the tagline
  setTimeout(() => {
    const typingTimer = setInterval(() => {
      letters++;
      tagline.textContent = fullText.slice(0, letters);
      if (letters >= fullText.length) {
        clearInterval(typingTimer);
      }
    }, 35);
  }, 2300);
}

const heroFacts = [
  "Ashoka called himself Devanampiya Piyadasi, which means Beloved of the Gods.",
  "Mauryan silver coins were punch-marked with small symbols like the sun and a tree inside a railing.",
  "Bindusara asked a Greek king for sweet wine, dried figs and a philosopher. He got the wine and figs.",
  "The Arthashastra, linked to Chanakya, describes a system of spies.",
  "Ashoka's pillars were made of polished sandstone."
];
const heroFactElement = document.querySelector('.js-fact');
const heroFactNumber = Math.floor(Math.random() * heroFacts.length);
heroFactElement.textContent = 'Did you know? ' + heroFacts[heroFactNumber];
