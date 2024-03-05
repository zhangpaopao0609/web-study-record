class Person {
    constructor() {
        this.name = new String('Arrow')
    }
    sayName() {
        console.log(this.name);
    }
    static t() {}
    static a() {}
};

let p2 = new Person.constructor();
console.log(p2);
console.log(p2 instanceof Person);
console.log(p2.constructor ===  Person);
console.log(p2.constructor ===  Person.constructor);

const p3 = new Person();
console.log(p3);
const p4 = new Person();
console.log(p4);
console.log(p3.name === p4.name);
console.log(p3.sayName === p4.sayName);

