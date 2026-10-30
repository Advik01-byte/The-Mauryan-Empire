/* ============================================================
   about.js  —  About Us.
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURE: the numbers count up from 0 (8, 3, 7, 6, 4, 6).

 1. Get the numbers:  document.querySelectorAll('.stats strong')
 2. forEach number: read the target:  const target = Number(element.textContent);
 3. Start at 0:  let count = 0;  element.textContent = 0;
 4. const timer = setInterval(() => { count++; element.textContent = count; ... }, 150);
 5. When count reaches target:  clearInterval(timer);

BONUS: click a team member card to show a short bio.
 Put the text in  data-bio="..."  on each .member, then toggle a class and
 show it with CSS (.member.is-open ...).
   ============================================================ */

// Write your code here.
