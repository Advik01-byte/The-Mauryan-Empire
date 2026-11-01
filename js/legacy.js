// Why It Still Matters: random "Did you know?" facts.
const legacyFacts = [
  "Pataliputra was surrounded by a wooden wall with 64 gates and 570 towers, says the Greek ambassador Megasthenes.",
  "Chandragupta's treaty with Seleucus included 500 war elephants.",
  "Ashoka's edicts were forgotten for centuries, until James Prinsep worked out the Brahmi script in 1837.",
  "The Ashoka Chakra on India's flag has 24 spokes.",
  "The lion capital found at Sarnath became India's national emblem.",
  "Ashoka planted shade trees, dug wells and built rest houses along the roads.",
  "The Mauryan Empire lasted about 137 years, from c. 322 to c. 185 BCE."
];
const factButton = document.querySelector('.js-fact-button');
const factText = document.querySelector('.js-fact-text');
let lastFactNumber = -1;
factButton.addEventListener('click', () => {
  let randomNumber = Math.floor(Math.random() * legacyFacts.length);
  while (randomNumber === lastFactNumber) {
    randomNumber = Math.floor(Math.random() * legacyFacts.length);
  }
  lastFactNumber = randomNumber;
  factText.textContent = legacyFacts[randomNumber];
});
