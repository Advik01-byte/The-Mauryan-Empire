// About Us: the numbers count up from 0 when they scroll into view.
const statNumbers = document.querySelectorAll('.stats strong');
function countUp(element) {
  const target = Number(element.dataset.target);
  let count = 0;
  const timer = setInterval(() => {
    count++;
    element.textContent = count;
    if (count >= target) {
      clearInterval(timer);
    }
  }, 150);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      statsObserver.unobserve(entry.target);
    }
  });
});
statNumbers.forEach((number) => {
  number.textContent = 0;
  statsObserver.observe(number);
});
