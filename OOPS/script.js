function User(username, loginCount, isLoggedIn) {
    this.username = username;
    this.loginCount = loginCount;
    this.isLoggedIn = isLoggedIn;

    return this;
}

const userOne = new User("Anusha", 12, true);
const userTwo = new User("Chai", 11, false);

console.log(userOne);
console.log(userTwo);
