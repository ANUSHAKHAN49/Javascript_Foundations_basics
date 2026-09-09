
Object.prototype.cleanInput = function () {
 
  
  // Case A: Agar String hai
  if (typeof this === "string" || this instanceof String) {
    return this.trim().toLowerCase();
  }

  // Case B: Agar Array hai (e.g. multi-inputs [' Admin ', ' USER '])
  if (Array.isArray(this)) {
    return this.map(item => typeof item === "string" ? item.trim().toLowerCase() : item);
  }

  // Case C: Agar Plain Object hai (e.g. form fields { name: " Ali ", email: " TEST@MAIL.COM " })
  if (typeof this === "object" && this !== null) {
    const cleanedObject = {};
    for (let key in this) {
      if (this.hasOwnProperty(key)) {
        cleanedObject[key] = typeof this[key] === "string" ? this[key].trim().toLowerCase() : this[key];
      }
    }
    return cleanedObject;
  }

  // Baaki cases ke liye as-is return kardo
  return this;
};

// TESTING THE POWER ACROSS DIFFERENT TYPES

// 1. Single String Input
const rawName = "   HASSAN ALi   ";
console.log(rawName.cleanInput()); 
// Output: "hassan ali"

// 2. Array of Strings
const rawTags = ["  JAVASCRIPT ", " ReactJS  ", " Node  "];
console.log(rawTags.cleanInput()); 
// Output: ["javascript", "reactjs", "node"]

// 3. Object with Form Inputs
const formData = {
  username: "   CodeQueen   ",
  email: " USER@EXAMPLE.COM  ",
  age: 22
};
console.log(formData.cleanInput()); 
// Output: { username: "codequeen", email: "user@example.com", age: 22 }
