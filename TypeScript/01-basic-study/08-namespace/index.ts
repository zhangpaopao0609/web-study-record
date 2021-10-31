namespace A {
  export class Animal {
    name: string;
    constructor(name: string) {
      this.name = name;
    };

    getName(): void {
      console.log(this.name);
    }
  }
};

const d = new A.Animal('dog');
d.getName();

namespace B {
  export class Animal {
    name: string;
    constructor(name: string) {
      this.name = name;
    };

    getName(): void {
      console.log(this.name);
    }
  }
};

const ld = new B.Animal('l dog');
ld.getName();