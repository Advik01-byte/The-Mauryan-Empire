/* ============================================================
   map.js  —  Empire map.
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURE: click a city to read its story in a box under the map.

 1. In index.html give each city (<g class="city" ...>) two attributes:
        data-name="Taxila"  data-info="A famous centre of learning."
    Add under the map:  <p class="js-city-info">Click a city</p>
 2. Get all cities:  document.querySelectorAll('.city')
 3. forEach city: city.addEventListener('click', () => { ... })
 4. Inside: write city.dataset.name and city.dataset.info into the box
    with textContent.

BONUS: zoom in with a button by changing the svg viewBox:
        svg.setAttribute('viewBox', '100 50 300 300')
   ============================================================ */

// Write your code here.
