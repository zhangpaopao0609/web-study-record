function QuickSort(arr) {
    const [low, high] = [0, arr.length-1];
    Sort(arr, low, high);
    console.log(arr);
}

function Sort(arr, low, high) {
    if(high <= low) return;
    const K = Partition(arr, low, high);
    Sort(arr, low, K-1);
    Sort(arr, K + 1, high);
}

function Partition(arr, low, high) {
    let [i, j] = [low, high+1];
    let num = arr[low];
    while(true) {
        while(arr[++i]<num) if (i==high) break;
        while(num<=arr[--j]) if (j==low) break;
        if(i >= j) break;
        exch(arr, i, j);
    }
    exch(arr, low, j);
    console.log(arr);
    debugger
    return j;
}

function exch(arr, i, j) {
    // [arr[i], arr[j]] = [arr[j], arr[i]];
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const arr = [9, 3, 4, 1, 6, 12, 6, 4, 8, 2, 5, 3, 7, 1];

QuickSort(arr);
