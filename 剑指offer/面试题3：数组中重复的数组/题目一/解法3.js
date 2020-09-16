const findCoverNum = function(arr) {
    for (let i = 0; i < arr.length; ) {
        if(arr[i]===i) {
            i++;
        }else if(arr[i] !== arr[arr[i]]){
            let temp = arr[i];
            arr[i] = arr[arr[i]];
            arr[temp] = temp;
        }else {
            return arr[i];
        }
    }
    return null;
}

const res1 = findCoverNum([2, 1, 5, 2, 6, 9, 8, 1, 2, 3]);
const res2 = findCoverNum([0, 1, 2, 3, 4, 5, 6, 7]);
const res3 = findCoverNum([]);
const res4 = findCoverNum([0, 2, 3, 11, 11]);

console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);

