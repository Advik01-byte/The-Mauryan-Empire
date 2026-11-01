// Timeline: filter events by ruler.
const filterButtons = document.querySelectorAll('.js-filter');
const timelineEvents = document.querySelectorAll('.ev');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const ruler = button.dataset.ruler;
    filterButtons.forEach((otherButton) => {
      otherButton.classList.remove('is-active');
    });
    button.classList.add('is-active');
    timelineEvents.forEach((timelineEvent) => {
      if (ruler === 'all' || timelineEvent.dataset.ruler === ruler) {
        timelineEvent.classList.remove('is-hidden');
      } else {
        timelineEvent.classList.add('is-hidden');
      }
    });
  });
});
