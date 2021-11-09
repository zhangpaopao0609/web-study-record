interface Circle {
  x: number;
  y: number;
};

interface Rectangle {
  x: number;
  y: string;
  z: number;
};

type Shape4 = Circle & Rectangle

declare const s1: Shape4;

s1.color

const bbj = 