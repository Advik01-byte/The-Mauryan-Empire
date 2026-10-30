/* ============================================================
   main.js  —  Shared code that runs on every page. Loaded first.
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURE: a "Back to top" button that shows only after you scroll down.

 1. In index.html add:  <button class="top-btn js-to-top">↑</button>
    Style .top-btn in css/base.css (position: fixed; bottom/right; hidden by default).
 2. Get it:        document.querySelector('.js-to-top')
 3. Listen:        window.addEventListener('scroll', ...)
 4. Inside it:     if (window.scrollY > 600) show the button, else hide it.
                   Show/hide with classList.add / classList.remove ('visible').
 5. Click:         button.addEventListener('click', ...)
                   window.scrollTo({ top: 0, behavior: 'smooth' });

HINT: Anything you want to reuse in several files (a function that picks a random
item, for example) can be written here. Files loaded later can use it.
   ============================================================ */

// Write your code here.
