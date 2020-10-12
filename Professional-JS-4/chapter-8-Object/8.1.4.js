// let dest = {
//     set a(val) {
//         console.log(val);
//     }
// };
// const src = {
//     get a() {
//         return 'foo';
//     }
// }
// let result;

// result = Object.assign(dest, src);

// console.log(dest, result);
const dest = {};
const src = {
    id: '1'
}

Object.assign(dest, src);

dest.id = 2;

console.log(dest, src);
