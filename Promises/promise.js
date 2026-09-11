
// 1. BASIC PROMISE CREATION & CONSUMPTION

const promiseOne = new Promise(function(resolve, reject) {
    // Asynchronous operation (e.g., DB call, File system, Timer)
    setTimeout(function() {
        console.log('Async task 1 is complete');
        resolve(); // resolve() call hoga tab hi .then() trigger hoga
    }, 1000);
});

promiseOne.then(function() {
    console.log("Promise 1 consumed");
});

// Inline Promise Creation & Consumption
new Promise(function(resolve, reject) {
    setTimeout(function() {
        console.log("Async task 2 is complete");
        resolve();
    }, 1000);
}).then(function() {
    console.log("Async 2 resolved");
});



// 2. PASSING DATA THROUGH RESOLVE

const promiseThree = new Promise(function(resolve, reject) {
    setTimeout(function() {
        // Resolve ke andar Object/Data pass karna
        resolve({ username: "Chai", email: "chai@example.com" });
    }, 1000);
});

promiseThree.then(function(user) {
    console.log("Promise 3 Data Received:", user);
});



// 3. PROMISE CHAINING & ERROR HANDLING (.then, .catch, .finally)

const promiseFour = new Promise(function(resolve, reject) {
    setTimeout(function() {
        let error = true; // Toggle error to test resolve/reject
        if (!error) {
            resolve({ username: "hitesh", password: "123" });
        } else {
            reject("ERROR: Something went wrong in Promise 4!");
        }
    }, 1000);
});

promiseFour
    .then((user) => {
        console.log("Promise 4 User:", user);
        return user.username; // Agle .then ko pass ho jayega
    })
    .then((username) => {
        console.log("Extracted Username:", username);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        console.log("Promise 4 is either resolved or rejected (Cleanup Phase)");
    });



// 4. CONSUMING PROMISES WITH ASYNC / AWAIT

const promiseFive = new Promise(function(resolve, reject) {
    setTimeout(function() {
        let error = true;
        if (!error) {
            resolve({ username: "javascript", password: "123" });
        } else {
            reject("ERROR: JS went wrong in Promise 5!");
        }
    }, 1000);
});

async function consumePromiseFive() {
    try {
        const response = await promiseFive;
        console.log("Promise 5 Response:", response);
    } catch (error) {
        console.log(error);
    }
}

consumePromiseFive();



// 5. MODERN API REQUESTS USING fetch()


// Option A: fetch() with async / await
async function getAllUsers() {
    try {
        const response = await fetch('https://api.github.com/users/hiteshchoudhary');
        const data = await response.json(); // .json() bhi promise hota hai, isliye await zaroori hai
        console.log("Fetch Data (Async/Await):", data);
    } catch (error) {
        console.log("E: ", error);
    }
}

getAllUsers();

// Option B: fetch() with .then() Chaining
fetch('https://api.github.com/users/hiteshchoudhary')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log("Fetch Data (.then):", data);
    })
    .catch((error) => {
        console.log("Fetch Error:", error);
    });
