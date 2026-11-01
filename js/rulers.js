// Three Great Rulers: tabs rotate by themselves until you click one.
const tabIds = ['#r1', '#r2', '#r3'];
let currentTab = 0;
const rotateTimer = setInterval(() => {
  currentTab = (currentTab + 1) % tabIds.length;
  document.querySelector(tabIds[currentTab]).checked = true;
}, 5000);
document.querySelector('.tabbar').addEventListener('click', () => {
  clearInterval(rotateTimer);
});
