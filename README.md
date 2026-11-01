# The Mauryan Empire — Grade 6 History Project

Scottish High International School · Advik Goyal, Aadvik Bansal, Bhuvik Garyali

Open `index.html` in any browser. It needs internet only for the Google Fonts
(it falls back to Georgia without them).

## Folder structure

```
mauryan-empire-project/
├── index.html              All the page content
├── README.md               This file
├── images/                 war.jpg + peace.jpg (the War to Peace slider pictures, 3:2 shape)
├── css/                    One stylesheet per section
│   ├── base.css            Colours (night + parchment), reset, titles, footer
│   ├── navigation.css      Top bar, lamp switch, hamburger overlay menu
│   ├── hero.css            Title banner, spinning Ashoka Chakra, facts ribbon
│   ├── story-cards.css     "The Big Picture" flip cards
│   ├── timeline.css        Timeline of the empire
│   ├── rulers.css          Three Great Rulers (tabs)
│   ├── map.css             Empire map that grows
│   ├── compare.css         "From War to Peace" before/after slider
│   ├── life.css            Life in the Empire (accordion)
│   ├── edicts.css          Ashoka's stone tablets
│   ├── treasure.css        Treasure Chamber gallery + pop-ups
│   ├── handbook.css        The Empire's Handbook (book + page layers)
│   ├── legacy.css          Why It Still Matters
│   ├── quiz.css            Quiz + score counter
│   ├── about.css           About Us + team pop-ups
│   ├── effects.css         Animations and transitions (splash, hero, scroll reveals, glows)
│   └── responsive.css      Phone layout + reduced motion (must load last)
└── js/                     One script per section
    ├── main.js             Back-to-top button
    ├── navigation.js       Esc closes the menu; lamp choice is remembered
    ├── hero.js             Typing tagline + random "Did you know?" fact
    ├── story-cards.js      Click to flip a card, Flip all / Flip all back
    ├── timeline.js         Filter events by ruler
    ├── rulers.js           Tabs that rotate by themselves
    ├── map.js              Click a city to read its story
    ├── life.js             Open all / Close all
    ├── edicts.js           Read a tablet aloud
    ├── treasure.js         Left/right arrow keys in the pop-ups
    ├── legacy.js           Random "Did you know?" facts
    ├── quiz.js             Score message, best score, reset
    ├── about.js            Numbers count up
    ├── handbook-fold.js    Drag a handbook page and watch it fold where you hold it
    └── compare-slider.js   Drag the golden bar from war to peace
```

## Good to know

- Most of the site is plain HTML + CSS (menu, lamp switch, tabs, map, accordion,
  pop-ups, quiz score, animations). The scripts add the extra features above.
- Every script is linked at the bottom of `index.html` with `defer`.
- If you delete all the `<script>` lines, the site still works as HTML + CSS:
  the handbook turns by clicking and the War / Split / Peace buttons move the slider.
  (The extra buttons the small scripts power would then do nothing.)
- The order of the `<link>` lines in `index.html` matters: `base.css` first,
  `responsive.css` last.
- To use different pictures in the slider, replace `images/war.jpg` and
  `images/peace.jpg` (3:2 shape works best) and keep the file names.
- To find where something is styled, match the section: the `id` in `index.html`
  (for example `id="map"`) matches the CSS file name.
