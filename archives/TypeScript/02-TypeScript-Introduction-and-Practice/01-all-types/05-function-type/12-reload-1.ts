function f(x: any): number;
function f(x: string): 0 | 1;

function f(x: any): any {};

const b: 0 | 1 = f('hi');