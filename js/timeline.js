/* ============================================================
   timeline.js  —  Timeline of the empire.
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURE: filter events by ruler.

 1. In index.html give each event a data attribute, for example:
        <div class="ev reveal" data-ruler="ashoka"> ...
    Add three buttons with classes js-filter and data-ruler="ashoka" etc.
    (plus one with data-ruler="all").
 2. Get the buttons (querySelectorAll) and the events:  document.querySelectorAll('.ev')
 3. On button click read:  button.dataset.ruler
 4. Loop over the events. If the ruler is "all" or matches the event's
    dataset.ruler, remove a class 'is-hidden'; otherwise add it.
 5. In css/timeline.css:  .ev.is-hidden { display: none; }

WATCH OUT: the timeline puts events on the left and right in turns. Hiding
some may change which side they sit on. That is fine, or try
visibility: hidden to keep the gaps.
   ============================================================ */

// Write your code here.
