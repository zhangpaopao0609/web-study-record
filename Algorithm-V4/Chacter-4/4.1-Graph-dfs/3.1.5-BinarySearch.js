// 二分查找循环实现
// function BinarySearch(arr, val) {
//     for (let i = 1; i < arr.length; i++) {
//         if(arr[i] < arr[i-1]) {
//             throw Error('Wrong Input, Array should be sorted')
//         }
//     }
//     let [low, high] = [0, arr.length - 1];
//     while(low <= high) {
//         let mid = parseInt(low + (high - low) / 2);
//         if(val > arr[mid]) {
//             low = mid + 1;
//         }else if(val < arr[mid]) {
//             high = mid - 1;
//         }else{
//             return mid;
//         }
//     }
//     throw Error('There is no val!')
// };

// const arr = [1, 3, 5, 7, 9, 12, 15];
// const val = 15
// const res = BinarySearch(arr, val);
// console.log(res);

// 二分查找递归实现
function Search(arr, val) {
    for (let i = 1; i < arr.length; i++) {
        if(arr[i] < arr[i-1]) {
            throw Error('Wrong Input, Array should be sorted')
        }
    }
    let [low, high] = [0, arr.length - 1];
    const res = BinarySearch(arr, val, low, high)
    if(res) return res;
    throw Error('There is no val!')
};

function BinarySearch(arr, val, low, high) {
    if(low > high) return ;
    let mid = parseInt(low + (high - low) / 2);
    if(val < arr[mid]) {
        return BinarySearch(arr, val, low, mid - 1);
    }else if(val > arr[mid]) {
        return BinarySearch(arr, val, mid + 1, high)
    }else{
        return mid;
    }
}
const arr = [1, 3, 5, 7, 9, 12, 15];
const val = 3
const res = Search(arr, val);
console.log(res);