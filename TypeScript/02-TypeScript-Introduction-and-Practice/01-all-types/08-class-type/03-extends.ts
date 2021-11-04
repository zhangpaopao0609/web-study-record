class Shape {
  color: string = 'black';

  constructor() {
    console.log(this.color);
    this.color = 'white';
    console.log(this.color);
  }
}

class Circle extends Shape {
  radius: number = 1;
  constructor() {
    super();
    console.log(this.radius);
    this.radius = 2;
    console.log(this.radius);
  }
}

const circle = new Circle()