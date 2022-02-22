interface Point {
  x: number;
  y: number;
}

interface Union {
  x: number;
  z: number;
}

type T1 = keyof Point;

type T2 = Point | Union;

interface A1 {
  x: number;
  y: number;
}
