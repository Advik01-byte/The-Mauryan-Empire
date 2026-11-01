// Flip cards: click to flip, plus "Flip all" and "Flip all back".
const cards = document.querySelectorAll('.flip');
cards.forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-flipped');
  });
});
const flipAllButton = document.querySelector('.js-flip-all');
flipAllButton.addEventListener('click', () => {
  cards.forEach((card) => {
    card.classList.add('is-flipped');
  });
});
const unflipAllButton = document.querySelector('.js-unflip-all');
unflipAllButton.addEventListener('click', () => {
  cards.forEach((card) => {
    card.classList.remove('is-flipped');
  });
});
