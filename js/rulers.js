/* ============================================================
   rulers.js  —  Three Great Rulers (tabs).
   This file has no code yet. The hints below are for you.
   Method and cheat sheet: see HINTS.md in the main folder.
   ------------------------------------------------------------
STARTER FEATURE: the tabs rotate by themselves, and stop when you click.

 1. The tabs are radio buttons with ids r1, r2, r3.
    Put their ids in an array:  const tabs = ['#r1', '#r2', '#r3'];
 2. let current = 0;
 3. const timer = setInterval(() => { ... }, 5000);
 4. Inside: current = (current + 1) % tabs.length;
            document.querySelector(tabs[current]).checked = true;
 5. Stop when a person clicks a tab:
        document.querySelector('.tabbar').addEventListener('click', () => clearInterval(timer));
   ============================================================ */

// Write your code here.
