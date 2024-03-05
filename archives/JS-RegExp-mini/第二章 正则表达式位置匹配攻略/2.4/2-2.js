const one = "12345678".replace(/(?=(\d{3})+$)/g, ',');

console.log(one);

const two = "123456789".replace(/(?!^)(?=(\d{3})+$)/g, ',');

console.log(two);

const three = "1234567890".replace(/(?!^)(?=(\d{3})+$)/g, ',');

console.log(three);

const four = "12345678 1234567890".replace(/(?!\b)(?=(\d{3})+\b)/g, ',');

console.log(four);

const five = "12345678 1234567890".replace(/\B(?=(\d{3})+\b)/g, ',');

console.log(five);