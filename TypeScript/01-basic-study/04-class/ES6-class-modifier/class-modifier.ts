// 3. 类的修饰符 typescript 里面定义属性的时候给我提供了三种修饰符
/**
 * public: 公有，在类里面、子类、类外面都可以访问
 * protected： 保护类型，在类里面、子类里面可以访问，在类外面不可访问
 * private：私有  只能再类里面访问，子类和类外面都不访问
 * 属性如果不加修饰符，默认是 public
 */

class Person {
  public name:string;
  protected age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public getName(): string {
    return this.name;
  }

  protected getAge(): number {
    return this.age;
  }

  private getNameAndAge(): string {
    return `${this.name} + ${this.age}`
  }

  public init() {
    return this.getNameAndAge();    // 私有方法只能当前类中获取
  }

  static nationality(): string {     // 静态方法，只能类自身调用  Person.nationality(),相当于Person.nationality = function() {}
    return 'China';
  }
};

console.log(Person.nationality());


const p = new Person('arow', 2);
console.log(p.name);    // 公有属性实例可直接访问

class Man extends Person {
  public getManAge() {
    return this.getAge();     // 受保护的方法只能 类 和 子类中获取，实例无法获取
  }
}

const tom = new Man('tom', 16);
console.log(tom.name);    // 公有属性实例可直接访问
console.log(tom.getManAge());   // 公有属性实例可直接访问

export {};