// 归并排序  归并就是如果我把左数组排好序 右数组也排好序，然后再归并起来，也就排好序了

function merge(arr, left, right, mid) {
  let i = k = left, j = mid+1;
  const keep = [];
  for (let m = left; m <= right; m++) {
    keep[m] = arr[m];
  }
  while(i <= mid && j <= right) {
    if(keep[i] <= keep[j]) arr[k++] = keep[i++];
    else arr[k++] = keep[j++];
  };
  while(i <= mid) {
    arr[k++] = keep[i++];
  };
  while(j <= right) {
    arr[k++] = keep[j++];
  };
}

function mergeSort(arr, left, right) {
  if(left >= right) {
    return;
  };
  const mid = left + ((right - left) >> 1);
  mergeSort(arr, left, mid);
  mergeSort(arr, mid+1, right);
  merge(arr, left, right, mid);
};

function MergeSortMain(arr) {
  mergeSort(arr, 0, arr.length-1);
  return arr;
}

const arr = [3, 5, 2, 4, 12, 1];
console.log(MergeSortMain(arr));