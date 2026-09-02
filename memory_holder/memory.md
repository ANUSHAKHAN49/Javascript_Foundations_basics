# JavaScript In-Memory Key-Value Store ("Memory Holder")

A lightweight, plain JavaScript application that demonstrates how to collect user inputs, dynamically assign custom key-value pairs to an in-memory object, and reliably search/recall them using object method checks.

---

##  Overview & Key Learning Objectives

The main purpose of this project is to understand core JavaScript object mechanisms without relying on external frameworks or utility libraries:

1. **Dynamic Object Assignment**: Learning how to set variable key names on a plain JavaScript object using **bracket notation** (`object[key] = value`) rather than dot notation.
2. **Input Normalization**: Converting user keys to lowercase (`.toLowerCase()`) so searching is case-insensitive.
3. **Safe Property Inspection**: Using `Object.prototype.hasOwnProperty()` to verify whether a key exists directly on the object.
4. **DOM Data Flow**: Capturing values from HTML `<input>` elements, storing them in-memory, and outputting formatted results to the DOM.

---

##  Program Flow Architecture

```
                 +-----------------------+
                 |   User Input Fields   |
                 +-----------------------+
                             |
         +-------------------+-------------------+
         |                                       |
         v                                       v
 [ SAVE ACTION ]                         [ RECALL ACTION ]
         |                                       |
  Get key & value                         Get search key
         |                                       |
  Convert key to lowercase                Convert key to lowercase
         |                                       |
  Valid input check?                      Check: memoryData.hasOwnProperty(key)?
   ├── YES: memoryData[key] = value                ├── YES: Display memoryData[key]
   └── NO: Display error message                   └── NO: Display "Not in memory"
         |                                       |
  Clear input fields                      Clear search field
```

---

##  Core Concepts Explained

### 1. Bracket Notation vs. Dot Notation
In JavaScript, dot notation (`obj.key`) requires a static property name. When the property key is stored in a variable (e.g., from an input field), **bracket notation** must be used:

```javascript
const keyName = "favoriteColor";
const obj = {};

// Dot notation fails to use the variable value (creates a literal property named "keyName")
obj.keyName = "blue"; // { keyName: "blue" }

// Bracket notation evaluates the variable
obj[keyName] = "blue"; // { favoriteColor: "blue" }
```

### 2. Input Case Normalization
Users might type `"Color"` during save and `"color"` during search. Converting keys to lowercase before saving and searching ensures consistent retrieval:

```javascript
const normalizedKey = userInput.trim().toLowerCase();
```

### 3. Safe Property Verification (`hasOwnProperty`)
`hasOwnProperty()` returns a boolean indicating whether the object has the specified property as its own property (as opposed to inheriting it through the prototype chain):

```javascript
if (memoryData.hasOwnProperty(searchKey)) {
    // Key exists directly on memoryData
    console.log(memoryData[searchKey]);
}
```

---

##  Full Implementation Code

### HTML (`index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Memory Holder</title>
</head>
<body>

  <h2>Save Memory</h2>
  <input type="text" id="keys" placeholder="Enter Key (e.g., age)">
  <input type="text" id="value" placeholder="Enter Value (e.g., 25)">
  <button id="save">Save to Memory</button>

  <hr>

  <h2>Recall Memory</h2>
  <input type="text" id="recall" placeholder="Search Key...">
  <button id="find">Search</button>

  <hr>

  <h3>Output:</h3>
  <div id="output"></div>

  <script src="app.js"></script>
</body>
</html>
```

### Plain JavaScript (`app.js`)

```javascript
// 1. Select DOM Elements
const memoryKey = document.querySelector('#keys');
const memoryValue = document.querySelector('#value');
const saveBtn = document.querySelector('#save');
const memoryRecall = document.querySelector('#recall');
const findBtn = document.querySelector('#find');
const result = document.querySelector('#output');

// 2. Main In-Memory Object Holder
const memoryData = {};

// 3. Save Memory Event Listener
saveBtn.addEventListener('click', function () {
    const key = memoryKey.value.trim().toLowerCase();
    const value = memoryValue.value.trim();

    if (key && value) {
        // Dynamically add key-value pair using bracket notation
        memoryData[key] = value;
        
        // Clear inputs after save
        memoryKey.value = '';
        memoryValue.value = '';
        
        result.innerText = `Saved! "${key}" set to "${value}"`;
    } else {
        result.innerText = "Please enter both a key and a value.";
    }
});

// 4. Recall / Search Event Listener
findBtn.addEventListener('click', function () {
    const searchKey = memoryRecall.value.trim().toLowerCase();

    if (!searchKey) {
        result.innerText = "Please enter a key to search.";
        return;
    }

    // Safely check if the key exists inside memoryData
    if (memoryData.hasOwnProperty(searchKey)) {
        result.innerText = `I recall: "${searchKey}" is "${memoryData[searchKey]}"`;
    } else {
        result.innerText = "This is not in my memory.";
    }

    // Clear search input field
    memoryRecall.value = '';
});
```

---

##  How to Run
1. Create a folder and save the HTML code as `index.html`.
2. Save the JavaScript code in the same folder as `app.js`.
3. Open `index.html` in any web browser.
