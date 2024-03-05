function Person(name, age) {
    this.name = name;
    this.age = age;
}

const person = new Person('arrow', 26);
console.log(person);

function Person1(name, age) {
    this.name = name;
    this.age = age;
    return { name: 'foo' };
}

const person1 = new Person1('arrow', 26);
console.log(person1);