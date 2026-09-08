# JavaScript E-commerce Logic & State Flow Guide

This guide explains the data flow, state management, and critical execution logic for an E-commerce shopping cart and real-time product search built with Vanilla JavaScript.

---

## 1. Application Architecture & Data Flow

The application follows a simple unidirectional data flow:

1. **State:** Immutable product catalog (`items`) and dynamic shopping cart (`cart`).
2. **Action:** User triggers events (Search button click, Add to Cart click).
3. **Transformation:** Array methods (`filter`, `find`, `reduce`) process state changes.
4. **Render:** Dynamic HTML updates the DOM structure based on updated state.

---

## 2. Core Execution Steps

```
[ Product Catalog ] ---> displayProducts() ---> [ Main DOM View ]
                                                      |
                                           User Clicks "Add to Cart"
                                                      |
                                                      v
[ Cart State Array ] <--- addToCart() <--- Target Product ID
         |
         v
   renderCart() ---> Calculates Total via reduce() ---> [ Cart DOM View ]
```

---

## 3. Key Technical Requirements & Critical Bugs

### Bug A: Stale Input Capture in Event Listeners
* **Problem:** Reading `searchInput.value` globally outside the click event listener captures the value only once on page load (empty string).
* **Fix:** Always retrieve `searchInput.value` **inside** the click event handler function body to read user input dynamically.

```javascript
// Correct Implementation
searchBtn.addEventListener('click', function () {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const filtered = items.filter(product => 
        product.name.toLowerCase().includes(searchQuery)
    );
    displayProducts(filtered);
});
```

---

### Bug B: Missing String Conversion on Array Maps (`.join('')`)
* **Problem:** Assigning `.map()` directly to `innerHTML` renders raw arrays, leaving commas `,` between UI elements.
* **Fix:** Append `.join('')` to convert array outputs into a single clean string.

```javascript
// Correct Implementation
main.innerHTML = productsList.map(item => `
    <div class="cart-item">
        <h2>${item.name}</h2>
        <p>Price: Rs. ${item.price}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
    </div>
`).join('');
```

---

## 4. Complete Executable Code

```javascript
// 1. DOM Elements
const main = document.querySelector('#main');
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const cartContainer = document.querySelector('#cart-container');

// 2. Data State
const items = [
    { id: 1, name: "Headphone", price: 3999 },
    { id: 2, name: "Wireless Mouse", price: 1999 }
];
let cart = [];

// 3. Render Product Catalog
function displayProducts(productsList) {
    main.innerHTML = productsList.map(item => `
        <div class="cart-item">
            <h2>${item.name}</h2>
            <p>Price: Rs. ${item.price}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
    `).join('');
}
displayProducts(items);

// 4. Filter Logic
searchBtn.addEventListener('click', function () {
    const searchQuery = searchInput.value.toLowerCase().trim();
    const filteredItems = items.filter(product => 
        product.name.toLowerCase().includes(searchQuery)
    );
    displayProducts(filteredItems);
});

// 5. Shopping Cart State Logic
function addToCart(productId) {
    const selectedPro = items.find(item => item.id === productId);
    let found = false;

    cart.forEach(item => {
        if (item.id === selectedPro.id) {
            item.quantity += 1;
            found = true;
        }
    });

    if (!found) {
        cart.push({ ...selectedPro, quantity: 1 });
    }

    renderCart();
}

// 6. Render Cart & Calculate Bill
function renderCart() {
    cartContainer.innerHTML = '<h2>Shopping Cart</h2>';

    cart.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: Rs. ${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
        `;
        cartContainer.appendChild(div);
    });

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const p = document.createElement('p');
    p.className = 'total-bill';
    p.innerText = `Your total bill is Rs. ${total}`;
    cartContainer.appendChild(p);
}
```
