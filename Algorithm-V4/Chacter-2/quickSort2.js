// 快排  
// 某个值的左右两边： 左边是小于等于的，右边是大于等于的

function exch(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

function partition(arr, left, right) {
  let i = left+1,j = right;
  while(true) {
    if(arr[i] > arr[left]) {
      exch(arr, i, j);
      j--;
    }else {
      i++;
    };
    if(i >= j) {
      break;
    };
  };
  exch(arr, left, j);
  return j;
};

function Sort(arr, left, right) {
  if(left >= right) return;
  const p = partition(arr, left, right);
  Sort(arr, left, p-1);
  Sort(arr, p+1, right);
};

function QuickSort(arr) {
  Sort(arr, 0, arr.length-1);
  return arr;
}

const arr = [9, 3, 4, 1, 6, 12, 6, 4, 8, 2, 5, 3, 7, 1];

const res = QuickSort(arr);

console.log(res);