// When you press a slider button (War / Split / Peace) or turn a handbook page,
// glide the page so that picture / book sits in the middle of the screen
// (the middle of the space under the sticky top bar).
const bar = document.querySelector('nav');
document.querySelectorAll('.compare > input, .handbook > input').forEach((input) => {
  input.addEventListener('change', () => {
    const target = input.closest('.compare') ? document.querySelector('.cmp-frame') : document.querySelector('.book');
    requestAnimationFrame(() => {
      const box = target.getBoundingClientRect();
      const barH = bar ? bar.offsetHeight : 0;
      const top = window.scrollY + box.top + box.height / 2 - (barH + (window.innerHeight - barH) / 2);
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
});
