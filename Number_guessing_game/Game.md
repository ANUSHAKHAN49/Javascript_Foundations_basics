# Number Guessing Game — Complete Code & Function Documentation

## 1. Global Variables Overview
* **`randomNumber`**: Generates a random integer between 1 and 100 using `parseInt(Math.random() * 100 + 1)`.
* **`submit`**: References the submit button element (`#sub`) to listen for submit click events.
* **`userInput`**: References the input field (`#guessField`) where players type their numbers.
* **`guessSlot`**: References the display container (`.guesses`) that shows the history of all submitted guesses.
* **`remaining`**: References the span element (`.lastResult`) that keeps track of remaining guess attempts.
* **`lowOrHi`**: References the output text element (`.lowOrHi`) used to display feedback messages to the user.
* **`startOver`**: References the parent container (`.resultParas`) where the "Start New Game" button is dynamically appended.
* **`p`**: A newly created `<p>` DOM node created via `document.createElement('p')` that serves as the container for the restart button.
* **`prevGuess`**: An array that stores all valid player guesses submitted during the active session.
* **`numGuess`**: A counter variable initialized to `1` that tracks the current turn or attempt number.
* **`playGame`**: A boolean flag (`true`/`false`) serving as a state variable to lock or unlock gameplay interactions.

---

## 2. Event Listeners & Execution Logic
The primary event listener attached to `submit` checks if `playGame` is true. When triggered by a click:
1. It executes `e.preventDefault()` to stop the standard HTML form submission and page refresh.
2. It parses the string input from `userInput.value` into an integer.
3. It passes that value into `validateGuess(guess)` for verification.

---

## 3. Detailed Function Explanations

### `validateGuess(guess)`
Acts as the validation guard before processing any guess.
* Checks if the value is Not-a-Number using `isNaN(guess)`.
* Checks if the input is less than `1` or greater than `100`.
* Displays an `alert()` box if the input fails any of those conditions.
* If valid, pushes the number into the `prevGuess` array.
* Checks if `numGuess === 10`. If true, it logs the guess, displays the "Game Over" message revealing `randomNumber`, and calls `endGame()`.
* If attempts remain, it calls `displayGuess(guess)` to update the UI and `checkGuess(guess)` to verify correctness.

### `checkGuess(guess)`
Evaluates the validated guess against `randomNumber`.
* If `guess === randomNumber`: Displays a success message (`'You guessed it right!'`) and calls `endGame()`.
* If `guess < randomNumber`: Displays `'Number is TOOO low'`.
* If `guess > randomNumber`: Displays `'Number is TOOO high'`.

### `displayGuess(guess)`
Handles DOM element updates after each valid guess.
* Clears the text input field (`userInput.value = ''`).
* Appends the new guess into `guessSlot.innerHTML`.
* Increments `numGuess` by 1.
* Updates the remaining counter text (`11 - numGuess`).

### `displayMessage(message)`
A utility function that updates `lowOrHi.innerHTML` with an `<h2>` element wrapping the feedback message string.

### `endGame()`
Triggers when the game ends via winning or running out of attempts.
* Clears `userInput.value` and adds a `disabled` attribute to prevent further input.
* Adds the class `'button'` to the created `p` element.
* Sets `p.innerHTML` to include `<h2 id="newGame">Start new Game</h2>`.
* Appends `p` into `startOver`.
* Sets `playGame = false` to block input handlers.
* Calls `newGame()` to attach the reset event listener.

### `newGame()`
Prepares the reset trigger for starting a new game.
* Selects `#newGame` and attaches a click event listener to it.
* On click:
  * Generates a new target integer in `randomNumber`.
  * Resets `prevGuess` to an empty array `[]`.
  * Resets `numGuess` counter back to `1`.
  * Clears `guessSlot.innerHTML`.
  * Resets remaining attempts text to `10`.
  * Removes the `disabled` attribute from `userInput`.
  * Removes the restart button `p` from `startOver`.
  * Clears message content via `displayMessage('')`.
  * Sets `playGame = true` to enable input for the new round.

---

## 4. Complete Execution Summary
When a player submits a number, `submit` intercepts the event and sends the value to `validateGuess()`. If valid, `displayGuess()` updates the remaining guess count and input field while `checkGuess()` compares the guess to `randomNumber`. If the player matches the number or reaches 10 attempts, `endGame()` disables the input and displays a "Start new Game" button. Clicking that button executes `newGame()`, which resets all state variables and restores the board to its initial state.
