#  JS Object Prototype Input Cleaner

A deep dive into JavaScript's **Prototypal Inheritance** and **Prototype Chain** by extending `Object.prototype` with a unified data-cleaning method.

---

##  Problem Statement
In web development, sanitizing user inputs (removing spaces via `.trim()` and converting to lower case via `.toLowerCase()`) requires writing repetitive code for different data types (strings, arrays, form objects).

##  Solution & Logic
By leveraging JavaScript's prototypal nature, a custom `.cleanInput()` method is added to `Object.prototype`. Since almost all data types inherit from `Object.prototype`, this method becomes accessible across:
- **Strings** (Direct cleaning)
- **Arrays** (Iterative element cleaning via `.map()`)
- **Objects** (Key-value iteration for form payloads)

---

##  Code Example

```javascript
// Extending Object.prototype
Object.prototype.cleanInput = function () {
  if (typeof this === "string" || this instanceof String) {
    return this.trim().toLowerCase();
  }

  if (Array.isArray(this)) {
    return this.map(item => typeof item === "string" ? item.trim().toLowerCase() : item);
  }

  if (typeof this === "object" && this !== null) {
    const cleaned = {};
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        cleaned[key] = typeof this[key] === "string" ? this[key].trim().toLowerCase() : this[key];
      }
    }
    return cleaned;
  }

  return this;
};

// --- Examples ---
const rawName = "   HASSAN ALi   ";
console.log(rawName.cleanInput()); 
// Output: "hassan ali"

const rawTags = ["  JAVASCRIPT ", " ReactJS  "];
console.log(rawTags.cleanInput()); 
// Output: ["javascript", "reactjs"]

const formData = { username: "   CodeQueen   ", age: 22 };
console.log(formData.cleanInput()); 
// Output: { username: "codequeen", age: 22 }
