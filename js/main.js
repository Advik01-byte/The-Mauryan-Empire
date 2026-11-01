// Back-to-top button: appears after you scroll down.
const toTopButton = document.querySelector('.js-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 600) {
    toTopButton.classList.add('visible');
  } else {
    toTopButton.classList.remove('visible');
  }
});
toTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
