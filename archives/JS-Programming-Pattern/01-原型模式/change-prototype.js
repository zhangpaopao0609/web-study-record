const obj = { name: 'ardor' };

const A = function() {};
A.prototype = obj;

const instanceA = new A();
console.log(instanceA.name);