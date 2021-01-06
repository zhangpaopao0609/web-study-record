/*
 * @lc app=leetcode.cn id=506 lang=javascript
 *
 * [506] 相对名次
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string[]}
 */
// 通过对数组排序可以得到排名，同时得到排名对应的索引数组，也就是分数排名的同时也记录了索引的变化
// 归并排序
const merge = (arr, l, m, r, record) => {
  let i = l, j = m+1, k = 0;
  const res = [], resRecord = [];
  while(i <= m && j <=r) {
    if(arr[i] < arr[j]) {
      res[k] = arr[i];
      resRecord[k] = record[i];
      k++;
      i++;
    } else {
      res[k] = arr[j]; 
      resRecord[k] = record[j];
      k++;
      j++;
    }
  };
  while(i <= m ) {
    res[k] = arr[i];
    resRecord[k] = record[i];
    k++;
    i++;
  };
  while(j <= r ) {
    res[k] = arr[j];
    resRecord[k] = record[j];
    k++;
    j++;
  };
  for (let k = l; k <= r; k++) {
    arr[k] = res[k-l];
    record[k] = resRecord[k-l];
  };
}

const mergeSort = (arr, l, r, record) => {
  if(l === r) return;
  const m = l + ((r - l) >> 1);
  mergeSort(arr, l, m, record);
  mergeSort(arr, m+1, r, record);
  merge(arr, l, m, r, record);
}

const findRelativeRanks = nums => {
  const len = nums.length;
  const record = Array(len).fill().map((_,i) => i);
  mergeSort(nums, 0, len-1, record);
  const obj = {
    1: "Gold Medal",
    2: "Silver Medal",
    3: "Bronze Medal"
  }
  for (let i = 0; i < len; i++) {
    const now = len - i;
    if(obj[now]) {
      nums[record[i]] = obj[now];
    }else {
      nums[record[i]] = (len - i).toString();
    }
  };
  return nums;
};
// @lc code=end

