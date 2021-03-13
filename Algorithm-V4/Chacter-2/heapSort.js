// 堆排序
// 先将数组通过 下沉 变成一个堆有序 然后每次取出第一个
function exch(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function sink(pq, k, N) {
  while(2*k <= N) {
    let j = 2*k;
    if(j < N && pq[j] < pq[j+1]) j++;
    if(pq[j] < pq[k]) break;
    exch(pq, j, k);
    k = j;
  }
};

function heapSort(arr) {
  arr.unshift(null);
  let len = arr.length-1;
  for (let i = len >> 1; i > 0; i--) {
    sink(arr, i, len);
  };
  while (len > 1) {
    exch(arr, 1, len--);
    sink(arr, 1, len);
  }
  return arr.slice(1);
}

const arr = [9, 3, 4, 1, 6, 12, 6, 4, 8, 2, 5, 3, 7, 1];

console.log(heapSort(arr));