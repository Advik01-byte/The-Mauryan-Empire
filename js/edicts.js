/* ============================================================
   edicts.js  —  Ashoka's edict tablets.
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURE: a "Read aloud" button (the browser has a built-in voice).

 1. In index.html add to each tablet:  <button class="js-read">🔊</button>
 2. Get the buttons:  document.querySelectorAll('.js-read')
 3. On click, find the text of that tablet:
        const text = button.closest('.tablet').querySelector('.msg p').textContent;
 4. Speak it:
        const voice = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(voice);
 5. Stop talking when clicked again:  speechSynthesis.cancel();

BONUS: voice.lang = 'hi-IN'  to hear Hindi (works if your device has a Hindi voice).
   ============================================================ */

// Write your code here.
