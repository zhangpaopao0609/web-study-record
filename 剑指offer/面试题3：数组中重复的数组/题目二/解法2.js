const findCoverNum = function(arr) {
    if (arr.length <= 0) {
        return null;
    }
    let start = 1;
    const len = arr.length;
    let end = len -1;
    while(end >= start) {
        let middle = ((end -start) >> 1) + start;
        let count = findNumberCount(arr, len, start, middle);
        if(end == start) {
            if( count > 1 ) {
                return start;
            } else {
                break;
            }
        }
        if(count > (middle - start + 1)) {
            end = middle;
        } else {
            start = middle + 1;
        }
    }
    return null;
}

const findNumberCount = function(arr, len, start, end) {
    if(arr.length === 0) return 0;
    let count = 0;
    for (let i = 0; i < len; i++) {
        if(arr[i] >= start && arr[i] <= end) {
            ++count;
        }
    }
    return count;
}

const res1 = findCoverNum([2, 1, 5, 2, 6, 9, 8, 1, 2, 3]);
const res2 = findCoverNum([0, 1, 2, 3, 4, 5, 6, 7]);
const res3 = findCoverNum([]);
const res4 = findCoverNum([0, 2, 3, 11, 11]);

console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);

