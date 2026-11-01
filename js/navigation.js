// Menu and lamp: Esc closes the menu; the lamp (parchment) choice is remembered.
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    window.location.hash = 'closed';
  }
});
const lampSwitch = document.querySelector('#torch');
if (localStorage.getItem('lamp') === 'true') {
  lampSwitch.checked = true;
}
lampSwitch.addEventListener('change', () => {
  localStorage.setItem('lamp', lampSwitch.checked);
});
