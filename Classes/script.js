
// 1. CONSTRUCTOR FUNCTIONS & PROTOTYPES

function createUser(username, score) {
    this.username = username;
    this.score = score;
}

// Prototype par naye methods add karna
createUser.prototype.increment = function() {
    this.score++;
};

createUser.prototype.printMe = function() {
    console.log(`score is ${this.score}`);
};

// 'new' keyword ke sath object banana
const chai = new createUser("chai", 25);
chai.printMe(); // Output: score is 25



// 2. GLOBAL OBJECT PROTOTYPE INJECTION


let heroPower = {
    thor: "hammer",
    spiderman: "sling",
    getSpiderPower: function() {
        console.log(`Spidy power is ${this.spiderman}`);
    }
};

// Directly top-level Object ke prototype mein method dalna
Object.prototype.Anusha = function() {
    console.log("Hello Anusha Everywhere");
};

// Yeh method Object aur Array dono par kaam karega
heroPower.Anusha(); // Output: Hello Anusha Everywhere

let hero = ["thor", "spidy"];
hero.Anusha();      // Output: Hello Anusha Everywhere



// 3. ES6 CLASSES & INHERITANCE


class User {
    constructor(username) {
        this.username = username;
    }

    logMe() {
        console.log(`Username is ${this.username}`);
    }
}

class Teacher extends User {
    constructor(username, password) {
        super(username); // Parent class (User) ke constructor ko call kar raha hai
        this.password = password;
    }

    addCourse() {
        console.log(`this course added by ${this.username}`);
    }
}

const Me = new Teacher("Anusha", "ak124");
Me.addCourse(); // Output: this course added by Anusha
Me.logMe();     // Output: Username is Anusha
