class A {
  x: string = '';

  y(): boolean {
    return true;
  };
};

interface B extends A {};

declare const b1: B;

b1.x
b1.y