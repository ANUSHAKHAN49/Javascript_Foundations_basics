# Object-Oriented Programming (OOP) Notes - Constructor Functions & `new` Keyword

## JavaScript Code Implementation

```javascript
function User(username, loginCount, isLoggedIn) {
    this.username = username;
    this.loginCount = loginCount;
    this.isLoggedIn = isLoggedIn;

    // Method injected inside constructor function
    this.greeting = function() {
        console.log(`Welcome ${this.username}`);
    };

    return this;
}

const userOne = new User("Hitesh", 12, true);
const userTwo = new User("Chai", 11, false);

console.log(userOne);
console.log(userTwo);
```

---

## Working of the `new` Keyword (Step-by-Step Execution)

When you use the `new` keyword in JavaScript, execution follows these exact four steps:

### **Step 1: Empty Object Creation**
* A brand new, empty object (`{}`) is created in memory.

### **Step 2: Constructor Function Call**
* The constructor function is automatically called because of the `new` keyword.
* All arguments passed (`username`, `loginCount`, `isLoggedIn`) are received by this constructor.

### **Step 3: `this` Keyword Binding**
* All properties and methods (like `this.greeting = function() { ... }`) get injected and bound directly to the newly created object instance using the `this` keyword.

### **Step 4: Implicit Return**
* The function automatically returns the populated object instance (even if an explicit `return this` statement is omitted).

---

## Key Highlights & OOP Concepts

* **Abstraction:** Hides the internal creation complexity while exposing clean object instances.
* **Encapsulation:** Groups data properties (`username`, `loginCount`, `isLoggedIn`) and behaviors (`greeting`) inside a single structural unit.
* **Instance Independence:** Each `new` keyword call creates a separate memory instance, ensuring `userOne` and `userTwo` never overwrite each other's data.
