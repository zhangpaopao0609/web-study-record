interface Circle {
  x: number;
  y: number;
};

interface Rectangle {
  x: number;
  y: string;
  z: number;
};

type Shape3 = Circle | Rectangle

declare const s: Shape3;

s.x
s.y