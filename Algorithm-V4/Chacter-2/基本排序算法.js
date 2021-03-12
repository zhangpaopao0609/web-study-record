function exch(arr, i, j) {
 const temp = arr[i];
 arr[i] = arr[j];
 arr[j] = temp;
};

// 选择排序
function selectSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let min = i;
    for (let j = i+1; j < len; j++) {
      if(arr[min] > arr[j]) {
        min = j;
      }
    }
    exch(arr, i, min);
  };
  return arr;
};

// 插入排序
function insertSort(arr) {
  const len = arr.length;
  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0 && arr[j] < arr[j-1]; j--) {
      exch(arr[j], arr[j-1]);
    }
  };
  return arr;
}

const arr = [3, 5, 2, 4, 12, 1];
console.log(selectSort(arr));
console.log(insertSort(arr));