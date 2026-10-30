/* ============================================================
   navigation.js  —  Top bar, lamp switch and hamburger menu.
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURES:

A) Press Esc to close the menu
 1. The menu closes when the page address ends with #closed.
 2. Listen:  document.addEventListener('keydown', (event) => { ... })
 3. Inside:  if (event.key === 'Escape') { window.location.hash = 'closed'; }

B) Remember the lamp (parchment) choice
 1. The lamp is a checkbox:  document.querySelector('#torch')
 2. Listen for:  'change'
 3. Save:   localStorage.setItem('lamp', torch.checked)   (true or false)
 4. When the page loads: read it back with localStorage.getItem('lamp')
    NOTE: localStorage gives back TEXT, so compare with the text 'true'.
    Then set  torch.checked = true  and the CSS changes the colours by itself.
   ============================================================ */

// Write your code here.
