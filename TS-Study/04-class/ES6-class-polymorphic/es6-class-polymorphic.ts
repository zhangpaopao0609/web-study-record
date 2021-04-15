// 多态：父类定义一个方法不去实现，让继承它的子类去实现，每一个子类都有不同的表现。
// 多态是继承的一种表现。
class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  };

  eat() {
    console.log('吃的方法！');
  }
};

class Dog extends Animal {
  eat() {
    console.log(`${this.name}吃肉！`);
  }
};

class Cat extends Animal {
  eat() {
    console.log(`${this.name}吃老鼠！`);
  }
};

const dog = new Dog('dog');
dog.eat()

export {};