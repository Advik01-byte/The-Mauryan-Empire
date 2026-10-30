/* ============================================================
   treasure.js  —  Treasure Chamber gallery.
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURE: left and right arrow keys move between the treasures.

 1. The pop-ups open when the address ends with #art1, #art2 or #art3.
 2. Make an array:  const ids = ['#art1', '#art2', '#art3'];
 3. Listen:  document.addEventListener('keydown', (event) => { ... })
 4. Find where you are:  ids.indexOf(window.location.hash)
    If it is -1, no pop-up is open, so do nothing (use an if + return).
 5. ArrowRight: next index; ArrowLeft: previous index (wrap around with %).
 6. Move there:  window.location.hash = ids[newIndex];
   ============================================================ */

// Write your code here.
