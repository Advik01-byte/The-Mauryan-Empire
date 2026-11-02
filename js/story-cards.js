// Big Picture flip cards and Edict tablets: click (or Enter / Space) opens and closes a card.
// Hovering opens a card while the pointer is on it; a click pins it open so it stays after you move away.
const cards = document.querySelectorAll('.flip');
const tablets = document.querySelectorAll('.tablet');
function makeToggle(card, openClass) {
  card.setAttribute('role', 'button');
  card.setAttribute('aria-pressed', 'false');
  const toggle = () => {
    const open = card.classList.toggle(openClass);
    card.setAttribute('aria-pressed', String(open));
  };
  card.addEventListener('click', toggle);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle();
    }
  });
}
cards.forEach((card) => makeToggle(card, 'is-flipped'));
tablets.forEach((tablet) => makeToggle(tablet, 'is-open'));

function setAll(list, openClass, open) {
  list.forEach((card) => {
    card.classList.toggle(openClass, open);
    card.setAttribute('aria-pressed', String(open));
  });
}
document.querySelector('.js-flip-all').addEventListener('click', () => setAll(cards, 'is-flipped', true));
document.querySelector('.js-unflip-all').addEventListener('click', () => setAll(cards, 'is-flipped', false));
