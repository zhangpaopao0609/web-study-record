function minElement(a) {
    let N = a.length;
    if(a[1] > a[0]) return 0;
    if(a[N-2] > a[N-1]) return N-1;
    let low = 1;
    let high = N - 2;
    while(low <= high) {
        let mid = parseInt(low + (high - low)/2);
        console.log(low, high, mid);
        if(a[mid] > a[mid-1]) {
            high = mid - 1;
        } else if(a[mid] > a[mid+1]) {
            low = mid + 1;
        } else {
            return mid;
        } 
    }
}

let a = [19, 13, 9, 4, 5, 1, 11, 14, 8, 25];
console.log(minElement(a));