// 二分查找

// 检查数组是否有序
function isSorted(arr) {
    for (let i = 0; i < arr.length-1; i++) {
        if(arr[i] > arr[i+1]) {
            throw Error("Array should be sorted!")
        }
    }
};
// 迭代方式
function BinarySearch_iteration(arr, val) {
    isSorted(arr);
    let [low, high] = [0, arr.length-1];
    while(low <= high) {
        const mid = low + ((high - low) >> 1);
        const now = arr[mid];
        if(val > now) {
            low = mid + 1;
        }else if(val < now) {
            high = mid - 1;
        }else {
            return mid;
        }
    };
    return low;
}

// 递归方式
function recursion(arr, val, low, high) {
    if(low > high) return low;
    const mid = low + ((high - low) >> 1);
    const now = arr[mid];
    if(val > now) {
        return recursion(arr, val, mid+1, high);
    }else if(val < now) {
        return recursion(arr, val, low, mid-1);
    }else {
        return mid;
    }
}

function BinarySearch_recursion(arr, val) {
    isSorted(arr);
    return recursion(arr, val, 0, arr.length - 1);
};

const arr = [1, 3, 5, 7, 9, 12, 15];
const val = 10;

console.log(BinarySearch_iteration(arr, val));
console.log(BinarySearch_recursion(arr, val));