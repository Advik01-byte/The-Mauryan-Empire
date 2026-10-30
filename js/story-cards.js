/* ============================================================
   story-cards.js  —  "The Big Picture" flip cards.
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURE: click a card to flip it (works on phones too).

 1. Get all cards:   document.querySelectorAll('.flip')
 2. Loop:            .forEach((card) => { ... })
 3. In the loop:     card.addEventListener('click', () => { card.classList.toggle('is-flipped'); })
 4. In css/story-cards.css add a rule that does the same as hover:
        .flip.is-flipped .in { transform: rotateY(180deg); }

THEN: add a "Flip all" button (class js-flip-all). Loop over the cards and
classList.add('is-flipped') on each one.
   ============================================================ */

// Write your code here.
