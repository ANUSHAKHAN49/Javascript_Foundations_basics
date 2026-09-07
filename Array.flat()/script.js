const customer = document.querySelector('#input');
const addList = document.querySelector('#addList');
const showList = document.querySelector('#showList');
const result = document.querySelector('#result');


const customerList = [];

// Step 1: Add entry inside a sub-array, then push to main array
addList.addEventListener('click', function () {
  let val = customer.value.trim();
  if (!val) return;

  let initial = [];
  initial.push(val);
  customerList.push(initial); 

  customer.value = '';
});

// Step 2: Flatten 2D nested array into 1D array and show on UI
showList.addEventListener('click', function () {
  // Using Array.prototype.flat() to flatten nested arrays
  let allData = customerList.flat();

  if (allData.length === 0) {
    result.innerHTML = '<p class="empty-state">Khata is empty!</p>';
    return;
  }

 
  let listItems = allData.map(item => `<li>${item}</li>`).join('');
  result.innerHTML = `<ul>${listItems}</ul>`;
});

// Support Enter key press inside input box
customer.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    addList.click();
  }
});
