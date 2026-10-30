/* ============================================================
   hero.js  —  Title banner.
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURES:

A) Typing effect on the tagline (the paragraph with class "tag")
 1. Get it:  document.querySelector('.tag')
 2. Save its text in a variable, then set  element.textContent = ''
 3. let i = 0;  then  setInterval(() => { ... }, 40)
 4. Inside: add one more letter:  text.slice(0, i)  then  i++
 5. When i is bigger than the text length: clearInterval(...) to stop.

B) "Fact of the day"
 1. Make an array of facts:  const facts = ['...', '...', '...'];
 2. Pick one at random (see the cheat sheet in HINTS.md).
 3. Put it in a new  <p class="js-fact">  with textContent.
   ============================================================ */

// Write your code here.
