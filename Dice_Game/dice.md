# 🎲 Dice Simulator — JavaScript & DOM Manipulation Breakdown

A lightweight and dynamic **Dice Rolling Simulator** built using HTML, CSS, and Vanilla JavaScript. This document breaks down the core architecture and logic used in the application.

---

## 📌 Code Architecture & Logic Flow

### 1. Element Selection (`querySelector`)
First, we select the **Roll Button** and all **6 Dice elements** from the DOM:

```javascript
const btnGo = document.querySelector('#go');

const dice1 = document.querySelector('#dice-1');
const dice2 = document.querySelector('#dice-2');
const dice3 = document.querySelector('#dice-3');
const dice4 = document.querySelector('#dice-4');
const dice5 = document.querySelector('#dice-5');
const dice6 = document.querySelector('#dice-6');
```

---

### 2. Grouping & Hiding Logic (`forEach` Loop)
To reset the visibility of all dice faces before each roll, all dice elements are placed into an array (`allDice`).

We wrap a `forEach` loop inside a helper function `hideAllDice()`. On every click, it loops through each dice element and applies the `.hide` class:

```javascript
// Store all dice elements in an array
const allDice = [dice1, dice2, dice3, dice4, dice5, dice6];

// Function to hide all dice faces
function hideAllDice() {
  allDice.forEach(dice => {
    dice.classList.add('hide');
  });
}
```

---

### 3. Click Event & Random Selection
An `addEventListener` is attached to the roll button (`#go`). When clicked, it executes three steps:

1. **Hide existing dice:** Calls `hideAllDice()` to reset the UI.
2. **Generate random number:** Computes a random integer between 1 and 6 using `Math.random()`.
3. **Show selected dice:** Uses a `switch` statement to match the generated number with the corresponding dice element and removes its `.hide` class.

```javascript
btnGo.addEventListener('click', function() {
  // 1. Hide any currently displayed dice
  hideAllDice();

  // 2. Generate random number between 1 and 6
  const min = 1;
  const max = 6;
  const ranNum = Math.floor(Math.random() * (max - min + 1)) + min;

  // 3. Switch statement to show the matched dice face
  switch (ranNum) {
    case 1:
      dice1.classList.remove('hide');
      break;
    case 2:
      dice2.classList.remove('hide');
      break;
    case 3:
      dice3.classList.remove('hide');
      break;
    case 4:
      dice4.classList.remove('hide');
      break;
    case 5:
      dice5.classList.remove('hide');
      break;
    case 6:
      dice6.classList.remove('hide');
      break;
    default:
      console.log("Invalid number generated.");
  }
});
```

---

## 🛠️ Concepts Covered
* **`document.querySelector()`**: Fetching elements by ID from the HTML document.
* **Array Methods (`forEach`)**: Mass updating CSS classes on dynamic groups of elements.
* **`classList.add()` / `classList.remove()`**: Controlling element visibility without innerHTML manipulation.
* **`Math.floor()` & `Math.random()`**: Standard algorithm for generating inclusive random integers.
