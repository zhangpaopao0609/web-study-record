const arr1 = new Array(3).fill(-1);
console.log(arr1);

const arr2 = new Array(3).fill(new Array(3).fill(-1));
console.log(arr2);

arr2[0][0] = 1;
arr2[1][1] = 2;
arr2[2][2] = 3;

console.log(arr2);

const arr3 = new Array(3).fill(-1).map(() => new Array(3).fill(-1));
console.log(arr3);
