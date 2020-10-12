// Kendall tau 距离
function KendallTau(A, B) {
    let lenA = A.length, lenB = B.length;
    if(lenA !== lenB) return 'wrong demision!'
    // 先记录a排列的索引，然后根据aIndex得到bIndex
    let aIndex = [], bIndex = [];
    for (let i = 0; i < lenA; i++) {
        aIndex[A[i]] = i;
    }
    for (let i = 0; i < lenA; i++) {
        bIndex[i] = aIndex[B[i]];
    }
    const kendallTau = MergeSort(bIndex);
    return kendallTau;
}

function MergeSort(arr) {
    return Sort(arr, 0, arr.length - 1);
}

function Sort(arr, low, high) {
    if(low >= high) return 0;
    const mid = parseInt(low + (high - low) / 2);
    let count = 0;
    count += Sort(arr, low, mid);
    count += Sort(arr, mid + 1, high);
    count += Merge(arr, low, mid, high);
    return count;
}

function Merge(arr, low, mid, high) {
    let i = low, j = mid + 1;
    let dest = [];
    for (let i = low; i <= high; i++) {
        dest[i] = arr[i];
    }
    let count = 0;
    for (let k = low; k <= high; k++) {
        if(i > mid) {
            arr[k] = dest[j++];
        }else if(j > high) {
            arr[k] = dest[i++];
        }else if(dest[i] > dest[j]) {
            count += mid - i + 1;
            for (let l = i; l <= mid; l++) {
                console.log("逆序对: ",dest[l], dest[j]);
            }
            arr[k] = dest[j++];
        }else {
            arr[k] = dest[i++];
        }
    }
    return count;
}

const A = [0, 3, 1, 6, 2, 5, 4 ];
const B = [1, 0, 3, 6, 4, 2, 5 ];
const result = KendallTau(A, B);
console.log(`Kendall tau: ${result}`);