# Memory Card Game — Documentation & Code Flow

## Overview
This project is a lightweight, interactive **Memory Card Game** written using vanilla HTML, CSS, and JavaScript. The objective of the game is to click on face-down cards to reveal hidden values ("Doll" or "Bear") and match identical pairs to increase the player's score.

---

## Technical Architecture

The application relies on three primary pillars of web development:

1. **HTML Document Structure**: Provides semantic containers (`<h1>`, `<h2>`, `#main`) for game status and playing area.
2. **CSS Styling**: Utilizes Flexbox for layout alignment, hover states, and card dimensioning.
3. **JavaScript Engine**: Handles dynamic rendering, state tracking, asynchronous delays using `setTimeout`, and DOM manipulation.

---

## State Architecture

The game maintains dynamic state through several JavaScript global variables:

| Variable Variable | Type | Description |
| :--- | :--- | :--- |
| `cards` | `Array<Object>` | Static data array containing card state (`name` for front side, `hide` for hidden side). |
| `card1` | `Object \| null` | Stores data object of the first clicked card in an active turn. |
| `card2` | `Object \| null` | Stores data object of the second clicked card in an active turn. |
| `card1Element` | `HTMLElement \| null` | References the DOM element of the first selected card. |
| `card2Element` | `HTMLElement \| null` | References the DOM element of the second selected card. |
| `score` | `Number` | Tracks total successfully matched pairs. |

---

## Execution Flow Diagram

Below is the structured step-by-step logic execution for the application:

```
[ Application Load ]
         │
         ▼
[ Initial Rendering ] ──► Map `cards` array into `.card` DIV elements & inject into `#main`
         │
         ▼
[ User Clicks Element ]
         │
         ├── Is target element `.card`?
         │         ├── NO ──► Ignore Click (Return)
         │         └── YES
         │              │
         │              ▼
         ├── Is `card1` null? (First Card Selection)
         │         ├── YES ──► Set `card1`, set `card1Element`, update text to `card1.hide`
         │         └── NO
         │              │
         │              ▼
         └── Is `card2` null & Target != `card1Element`? (Second Card Selection)
                   │
                   ├── Set `card2`, set `card2Element`, update text to `card2.hide`
                   │
                   ▼
         [ Evaluate Match Condition ] (`card1.hide === card2.hide`)
                   │
                   ├── MATCH SUCCESS ──► Increment `score`, update `#score` text, reset `card1` & `card2` to null
                   │
                   └── MATCH FAILURE ──► Wait 1000ms (1 Second) via `setTimeout`
                                             │
                                             ▼
                                         Revert text of both elements back to `name` ("UNO"),
                                         reset state variables (`card1`, `card2`) to null
```

---

## Detailed Code Breakdown

### 1. Data Initialization & Layout setup
The `cards` array acts as the single source of truth for the hidden and visible labels.

```js
const cards = [
  { name: "UNO", hide: "Doll" },
  { name: "UNO", hide: "Bear" },
  { name: "UNO", hide: "Doll" },
  { name: "UNO", hide: "Bear" }
];
```

### 2. Dynamic DOM Rendering (`displayCards`)
Instead of manually hardcoding HTML elements, `displayCards` dynamically maps over the array and injects HTML strings into `#main` using custom data attributes (`data-index`) for state association.

```js
function displayCards(cd) {
  const list = cd.map((item, index) => {
    return `<div class="card" data-index="${index}">${item.name}</div>`;
  });
  main.innerHTML = list.join("");
}
```

### 3. Event Delegation & Selection Logic
Using **Event Delegation**, a single click event listener is attached to the parent container (`#main`) rather than attaching listeners to each card individually.

* **First Selection Phase**: Captures the index, reveals `item.hide`, and locks `card1Element`.
* **Second Selection Phase**: Validates that the click wasn't on the already selected card (`e.target !== card1Element`).
* **Comparison Phase**:
  * **Match**: Score increments immediately and selection pointers are cleared.
  * **Mismatch**: Execution holds for `1000ms` using `setTimeout`, reverting text back to "UNO" before clearing state pointers.

---

## Full HTML / CSS / JS Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Memory Card Game</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #f4f4f9;
      margin: 0;
      padding: 20px;
    }

    #main {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 20px;
      flex-wrap: wrap;
    }

    .card {
      width: 100px;
      height: 140px;
      background-color: #3498db;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s, background-color 0.2s;
    }

    .card:hover {
      transform: scale(1.05);
    }
  </style>
</head>
<body>

  <h1>Memory Card Game</h1>
  <h2 id="score">Score: 0</h2>
  <div id="main"></div>

  <script>
    const main = document.querySelector("#main");
    const scoreElement = document.querySelector("#score");

    const cards = [
      { name: "UNO", hide: "Doll" },
      { name: "UNO", hide: "Bear" },
      { name: "UNO", hide: "Doll" },
      { name: "UNO", hide: "Bear" }
    ];

    let card1 = null;
    let card2 = null;
    let card1Element = null;
    let card2Element = null;
    let score = 0;

    function displayCards(cd) {
      const list = cd.map((item, index) => {
        return `<div class="card" data-index="${index}">${item.name}</div>`;
      });
      main.innerHTML = list.join("");
    }

    displayCards(cards);

    main.addEventListener("click", function(e) {
      if (!e.target.classList.contains("card")) return;

      const index = e.target.getAttribute("data-index");

      if (!card1) {
        card1 = cards[index];
        card1Element = e.target;
        card1Element.innerText = card1.hide;
      } 
      else if (!card2 && e.target !== card1Element) {
        card2 = cards[index];
        card2Element = e.target;
        card2Element.innerText = card2.hide;

        if (card1.hide === card2.hide) {
          score += 1;
          scoreElement.innerText = "Score: " + score;
          card1 = null;
          card2 = null;
        } else {
          setTimeout(() => {
            card1Element.innerText = card1.name;
            card2Element.innerText = card2.name;
            card1 = null;
            card2 = null;
          }, 1000);
        }
      }
    });
  </script>

</body>
</html>
```
