/* ============================================================
   quiz.js  —  Quiz.
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURES (do them in this order):

A) Reset button. A full worked example is in HINTS.md. Do this first.

B) A message based on the score
 1. The score on the page is made by CSS. JavaScript can count it too:
        document.querySelectorAll('.quiz input.ok:checked').length
 2. In index.html add under the score:  <p class="js-score-message"></p>
 3. Listen for 'change' on the quiz:  document.querySelector('.quiz').addEventListener('change', ...)
 4. Inside: count correct answers, then use if / else if / else:
        6 = "Perfect!"   4 or 5 = "Great job!"   otherwise = "Read the handbook and try again!"
 5. Show it with textContent.

C) Save the best score:  localStorage.setItem('best', score)
   Read it back later with localStorage.getItem('best') (it comes back as text; use Number(...)).
   ============================================================ */

// Write your code here.
