# The Mauryan Empire — Class 6 History Project

Open `index.html` in any browser. It needs internet only for the Google Fonts
(it falls back to Georgia without it).

## Folder structure

```
mauryan-empire-project/
├── index.html              All the page content (HTML only)
├── README.md               This file
├── HINTS.md                How to write the JavaScript, step by step (read this!)
├── css/                    One stylesheet per section
│   ├── base.css            Colours (night + parchment), reset, titles, footer
│   ├── navigation.css      Top bar, lamp switch, hamburger overlay menu
│   ├── hero.css            Title banner, spinning Ashoka Chakra, facts ribbon
│   ├── story-cards.css     "The Big Picture" flip cards
│   ├── timeline.css        Timeline of the empire
│   ├── rulers.css          Three Great Rulers (tabs)
│   ├── map.css             Empire map that grows
│   ├── life.css            Life in the Empire (accordion)
│   ├── edicts.css          Ashoka's stone tablets
│   ├── treasure.css        Treasure Chamber gallery + pop-ups
│   ├── handbook.css        The Empire's Handbook (book + page layers)
│   ├── legacy.css          Why It Still Matters
│   ├── quiz.css            Quiz + score counter
│   ├── about.css           About Us
│   └── responsive.css      Phone layout + reduced motion (must load last)
└── js/                     One script per section
    ├── main.js             Shared code, loaded first (EMPTY, for you)
    ├── navigation.js       (EMPTY, for you)
    ├── hero.js             (EMPTY, for you)
    ├── story-cards.js      (EMPTY, for you)
    ├── timeline.js         (EMPTY, for you)
    ├── rulers.js           (EMPTY, for you)
    ├── map.js              (EMPTY, for you)
    ├── life.js             (EMPTY, for you)
    ├── edicts.js           (EMPTY, for you)
    ├── treasure.js         (EMPTY, for you)
    ├── legacy.js           (EMPTY, for you)
    ├── quiz.js             (EMPTY, for you)
    ├── about.js            (EMPTY, for you)
    └── handbook-fold.js    Drag-to-fold for the handbook (already written)
```

## Good to know

- Everything is HTML + CSS except the files in `js/`. Only `handbook-fold.js`
  has code; the others are empty files with an idea list at the top.
  To run with no JavaScript, delete all the `<script>` lines at the bottom of
  `index.html`. The handbook still turns by clicking.
- Each JS file is already linked in `index.html` (with `defer`), so anything you
  write in it works straight away.
- The order of the `<link>` lines in `index.html` matters: `base.css` first,
  `responsive.css` last.
- The pillar and coin drawings are defined once near the top of `index.html`
  (inside a hidden `<svg>`) and reused in the Treasure Chamber.
- To find where something is styled, match the section: the `id` in
  `index.html` (for example `id="map"`) matches the CSS file name.

## Before you submit

- Replace `[School Name]` in `index.html` (About Us section and footer).
- Check the dates against your textbook and cite your sources.
