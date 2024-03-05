function Person() {};
Person.prototype.name = 'arrow';
Person.prototype.sayName = function() {
    console.log(this.name);
}

const person1 = new Person();
const person2 = new Person();
person2.name = 'bullet';
console.log(person1.sayName(), person2.sayName());