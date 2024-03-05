// TS 中的抽象类：它是提供其他类继承的基类，不能直接被实例化

// 用 abstract 关键字定义抽象类和抽象方法，抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。

// abstract 抽象方法只能放在抽象类里面

// 抽象类和抽象方法用来定义标准

// 例如： Animal 这个类要求它的子类必须包含 eat 方法

abstract class Animal {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  abstract eat(): any;
}

class  Dog extends Animal {
  eat() {
    console.log(`${this.name} eat meat`);
  }
};

const d = new Dog('dog');
d.eat();

export default Animal;