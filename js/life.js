// Life in the Empire: Open all / Close all.
const scrolls = document.querySelectorAll('details');
const openAllButton = document.querySelector('.js-open-all');
openAllButton.addEventListener('click', () => {
  scrolls.forEach((scroll) => {
    scroll.removeAttribute('name');
    scroll.open = true;
  });
});
const closeAllButton = document.querySelector('.js-close-all');
closeAllButton.addEventListener('click', () => {
  scrolls.forEach((scroll) => {
    scroll.open = false;
    scroll.setAttribute('name', 'life');
  });
});
