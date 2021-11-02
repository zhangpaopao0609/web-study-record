function add(x: number, y: number): number;
function add(x: any[], y: any[]): any[];

function add(x: number | any[], y: number | any[]): number | any[] | undefined {
  if (typeof x === 'number' && typeof y === 'number') {
    return x + y;
  };

  if (Array.isArray(x) && Array.isArray(y)) {
    return [...x, ...y];
  };
};

add(1, 2);

add([1], [2]);