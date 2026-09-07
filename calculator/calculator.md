# Simple JavaScript Calculator

A beginner-friendly calculator project built using simple HTML, CSS, and JavaScript.

---

##  Project Structure

* **`index.html`** — Contains the calculator layout, input display, buttons, and CSS styles.
* **`script.js`** — Handles all the button clicks, logic, and calculation rules.

---

##  How Code Works (Logic Flow)

The calculator stores values in three basic variables:
* `val1`: Holds the first number.
* `val2`: Holds the second number.
* `operator`: Holds the chosen operation (`+`, `-`, `*`, `/`).

### Step-by-Step Flow:
1. **Button Clicks:** Listens for clicks on all calculator buttons.
2. **Clear (`C`):** Resets `val1`, `val2`, and `operator` to empty strings.
3. **Decimals (`.`):** Prevents entering more than one decimal point in a single number.
4. **Operators (`+`, `-`, `*`, `/`):** Saves the operator once `val1` has a value.
5. **Building Numbers:**
   * If `operator` is empty, button clicks build `val1`.
   * If `operator` is set, button clicks build `val2`.
6. **Equal Sign (`=`):** Converts `val1` and `val2` into numbers, calculates the result, displays it, and allows you to continue calculating with the answer.

---

##  Edge Cases Handled

* **Multiple Decimals:** Blocks inputs like `12.3.4` by checking if `.includes(".")` is already true.
* **Division by Zero:** Checks if `num2 === 0` during division and displays `"Error"` instead of crashing.
* **Operator Without First Number:** Prevents clicking `+` or `*` before typing a first number.
* **Double Operators:** Prevents adding duplicate operators like `5 + +`.
* **Continuing Calculations:** Keeps the answer in `val1` after pressing `=` so you can immediately perform the next operation.

---

##  Calculation Function

```javascript
function calculate(num1, num2, op) {
  if (op === "+") return num1 + num2;
  if (op === "-") return num1 - num2;
  if (op === "*") return num1 * num2;
  if (op === "/") return num2 !== 0 ? num1 / num2 : "Error";
  return 0;
}
