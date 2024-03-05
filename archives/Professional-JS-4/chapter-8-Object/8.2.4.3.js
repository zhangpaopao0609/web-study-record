function Person() {};
Person.prototype.name = 'arrow';

const person = new Person();

for (const key in person) {
    console.log(key);
}

const keys = Object.keys(person);
console.log(keys);

const keys2 = Object.getOwnPropertyNames(Person.prototype);
console.log(keys2);

const keys1 = Object.keys(Person.prototype);
console.log(keys1);

const test = person.constructor;
console.log(test);
const test1 = person.constructor.constructor;
console.log(test1);