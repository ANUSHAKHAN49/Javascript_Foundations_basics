// 1. DOM Elements Selection
const main = document.querySelector('#main');
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');
const cartContainer = document.querySelector('#cart-container');

// 2. Data Array
const items = [
    { id: 1, name: "Headphone", price: 3999 },
    { id: 2, name: "Wireless Mouse", price: 1999 }
];

// 3. Render Initial Products
function displayProducts(productsList) {
    const list = productsList.map((item) => {
        return `
            <div class="cart-item">
                <h2>${item.name}</h2>
                <p>Price: Rs. ${item.price}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
    });
    main.innerHTML = list.join(''); // .join('') commas ko khatam karta hai
}

// First time render
displayProducts(items);

// 4. Search Functionality
searchBtn.addEventListener('click', function () {
    // searchQuery yahan andar variable mein fresh read honi chahiye
    const searchQuery = searchInput.value.toLowerCase().trim();

    if (searchQuery !== "") {
        const filteredItems = items.filter(product => 
            product.name.toLowerCase().includes(searchQuery)
        );
        displayProducts(filteredItems);
    } else {
        displayProducts(items); // Search khali ho toh wapis sare items dikhao
    }
});

// 5. Cart Logic
let cart = [];

function addToCart(productId) {
    const selectedPro = items.find(item => item.id === productId);
    let found = false;

    // Check if already in cart
    cart.forEach((item) => {
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

// 6. Display Cart & Total
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

    // Calculate Total
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const p = document.createElement('p');
    p.className = 'total-bill';
    p.innerText = `Your total bill is Rs. ${total}`;
    cartContainer.appendChild(p);
}
