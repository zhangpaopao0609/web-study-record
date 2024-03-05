interface Shape {
  name: string;
};

interface Style {
  color: string;
};

interface Circle extends Style, Shape {
  radius: number;
};

const c: Circle = {
  name: '1',
  color: '',
  radius: 1,
}