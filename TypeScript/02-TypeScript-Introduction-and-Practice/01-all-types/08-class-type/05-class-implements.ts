interface Color1 {
  color: string;
};

interface Shape1 {
  area(): number;
};

class Circle1 implements Color1, Shape1 {
  radius: number = 1;
  color: string = '';
  area(): number {
    return 1
  }
}