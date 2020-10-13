const obj = {
    name: 'arrow',
    test: {}
}

console.log(obj);

const arr = Object.entries(obj);
console.log(arr);

arr[1][1].name = 'bullet';

console.log(arr);
console.log(obj);