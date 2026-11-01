// Treasure Chamber: left/right arrow keys move between pop-ups.
const treasureIds = ['#art1', '#art2', '#art3'];
document.addEventListener('keydown', (event) => {
  const position = treasureIds.indexOf(window.location.hash);
  if (position === -1) {
    return;
  }
  if (event.key === 'ArrowRight') {
    window.location.hash = treasureIds[(position + 1) % treasureIds.length];
  }
  if (event.key === 'ArrowLeft') {
    window.location.hash = treasureIds[(position - 1 + treasureIds.length) % treasureIds.length];
  }
});
