let val1 = "";
let val2 = "";
let operator = "";

const display = document.querySelector('#display');
const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
  button.addEventListener('click', function () {
    let value = button.innerText;

    // 1. Clear button logic
    if (value === "C") {
      val1 = "";
      val2 = "";
      operator = "";
      display.value = "";
      return;
    }

    // 2. Decimal input logic (prevents multiple decimals in one number)
    if (value === ".") {
      if (operator === "" && val1.includes(".")) return;
      if (operator !== "" && val2.includes(".")) return;
    }

    // 3. Equals (=) logic - perform calculation
    if (value === "=") {
      if (val1 !== "" && val2 !== "" && operator !== "") {
        let result = calculate(parseFloat(val1), parseFloat(val2), operator);
        display.value = result;
        val1 = result.toString();
        val2 = "";
        operator = "";
      }
      return;
    }

    // 4. Operator (+, -, *, /) logic
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      if (operator !== "" && val2 === "") return;
      if (val1 !== "") {
        operator = value;
        display.value = val1 + " " + operator;
      }
      return;
    }

    // 5. Number input logic
    if (operator === "") {
      val1 += value;
      display.value = val1;
    } else {
      val2 += value;
      display.value = val1 + " " + operator + " " + val2;
    }
  });
});

// Helper calculation function
function calculate(num1, num2, op) {
  if (op === "+") return num1 + num2;
  if (op === "-") return num1 - num2;
  if (op === "*") return num1 * num2;
  if (op === "/") return num2 !== 0 ? num1 / num2 : "Error";
  return 0;
}
