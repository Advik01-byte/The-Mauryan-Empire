# JavaScript Hints (beginner style, small steps)

Every JS file in `js/` is empty on purpose and has hints at the top.
This page explains the method once, so the hints in each file are short.

## The 3-step pattern (almost every feature uses it)

1. **Get the element** you want to work with.
2. **Listen for something to happen** (a click, a key press, a scroll).
3. **Change the page** when it happens.

```js
// 1. get the element
const button = document.querySelector('.js-reset-button');

// 2. listen for a click
button.addEventListener('click', () => {

  // 3. change the page
  button.textContent = 'Clicked!';
});
```

## The `js-` class rule

Keep CSS names and JavaScript names separate.
If JavaScript needs to find an element, give it a class that starts with `js-`.

```html
<button class="reset-btn js-reset-button">Reset quiz</button>
```

- `reset-btn` is for CSS (how it looks).
- `js-reset-button` is for JavaScript (how you find it).

If you rename a style later, your JavaScript still works.

## Cheat sheet

| I want to...                         | Use                                                  |
|--------------------------------------|------------------------------------------------------|
| find ONE element                     | `document.querySelector('.js-name')`                 |
| find MANY elements                   | `document.querySelectorAll('.js-name')` then `.forEach(...)` |
| do something on click                | `element.addEventListener('click', () => { ... })`   |
| do something on a key press          | `document.addEventListener('keydown', (event) => { ... })` then `event.key` |
| change text                          | `element.textContent = 'new text'`                   |
| add / remove / switch a CSS class    | `element.classList.add('x')`, `.remove('x')`, `.toggle('x')` |
| read a checkbox / radio              | `input.checked` (true or false)                      |
| read a custom `data-` attribute      | `element.dataset.name` (from `data-name="..."`)      |
| run something again and again        | `setInterval(() => { ... }, 1000)` and `clearInterval(id)` |
| run something once, later            | `setTimeout(() => { ... }, 1000)`                    |
| pick a random item                   | `array[Math.floor(Math.random() * array.length)]`    |
| save something in the browser        | `localStorage.setItem('key', value)` and `localStorage.getItem('key')` |
| find out what went wrong             | `console.log(...)` and press **F12** to open the Console |

## Rules that save you hours

- **One tiny feature at a time.** Save, refresh the browser, test. Then the next.
- **Use `console.log` a lot.** `console.log(button)` shows `null` if your class name has a typo.
- **`null` errors** (`Cannot read properties of null`) almost always mean the class name in
  JavaScript does not match the HTML. Check spelling and the `.` at the start.
- **`querySelector` finds the FIRST match only.** Use `querySelectorAll` for many.
- The scripts are linked with `defer`, so the page is already loaded when your code runs.
- Use `const` for things that never change and `let` for things that do.
- If a feature needs a new button or text on the page, add it to `index.html` first
  (with a `js-` class), style it in the matching CSS file, then write the JavaScript.

## Worked example: a "Reset quiz" button (quiz.js)

**Step 0: add the button in `index.html`** (inside `<div class="quiz">`, above the score):

```html
<button class="reset-btn js-reset-button">Reset quiz</button>
```

**Step 1 to 3 in `js/quiz.js`:**

```js
// 1. get the button
const resetButton = document.querySelector('.js-reset-button');

// 2. listen for a click
resetButton.addEventListener('click', () => {

  // 3. un-tick every answer (this also resets the CSS score counter)
  document.querySelectorAll('.quiz input').forEach((input) => {
    input.checked = false;
  });
});
```

Style `.reset-btn` in `css/quiz.css` (gold border, same look as the other buttons).
That is the whole feature: three steps, nine lines.

## What each file could do

The hints are also at the top of each file, with the exact class names that exist in the page.

| File             | Starter feature                                              |
|------------------|--------------------------------------------------------------|
| `main.js`        | "Back to top" button that appears when you scroll down       |
| `navigation.js`  | Esc key closes the menu; remember the lamp (parchment) choice |
| `hero.js`        | Typing effect on the tagline, or a random "fact of the day"  |
| `story-cards.js` | Click to flip a card, "Flip all" button                      |
| `timeline.js`    | Filter events by ruler                                       |
| `rulers.js`      | Tabs that rotate by themselves every few seconds             |
| `map.js`         | Click a city to show its story in a box                      |
| `life.js`        | "Open all" and "Close all" buttons                           |
| `edicts.js`      | "Read aloud" button using the browser's voice                |
| `treasure.js`    | Left and right arrow keys move between treasures             |
| `legacy.js`      | "Did you know?" button with a random fact                    |
| `quiz.js`        | Message based on the score, reset button, save best score    |
| `about.js`       | Numbers that count up from 0                                 |

## Good order to learn them in

Easiest first: `life.js` → `story-cards.js` → `quiz.js` (reset button) → `legacy.js` →
`navigation.js` → `treasure.js` → `about.js` → `hero.js` → `timeline.js` → `map.js` → `main.js`.
