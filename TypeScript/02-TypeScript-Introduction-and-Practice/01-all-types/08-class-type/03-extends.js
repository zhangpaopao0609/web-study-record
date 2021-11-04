"use strict";
class Shape {
    constructor() {
        this.color = 'black';
        console.log(this.color);
        this.color = 'white';
        console.log(this.color);
    }
}
class Circle extends Shape {
    constructor() {
        super();
        this.radius = 1;
        console.log(this.radius);
        this.radius = 2;
        console.log(this.radius);
    }
}
const circle = new Circle();
