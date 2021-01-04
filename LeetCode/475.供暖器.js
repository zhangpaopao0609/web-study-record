/*
 * @lc app=leetcode.cn id=475 lang=javascript
 *
 * [475] 供暖器 
 * 
 */

// @lc code=start
/**
 * @param {number[]} houses
 * @param {number[]} heaters
 * @return {number}
 */
// 第一种方式
// 我是这么想的，将heaters依次从0加到n，直到houses每个数都在变化后的heters中
// GG 超时了
const changHeaters = (arr, r) => {
  const hashSet = new Set();
  for (let i = 0; i < arr.length; i++) {
    for (let j = -r; j <= r; j++) {
      hashSet.add(arr[i] + j);
    }
  };
  return hashSet;
}
const findRadius = (houses, heaters) => {
  let r = -1;
  while(true) {
    r++;
    const nowSet = changHeaters(heaters, r);
    let flag = true;
    for (let i = 0; i < houses.length; i++) {
      if(!nowSet.has(houses[i])) {
        flag = false;
        continue;
      }
    };
    if(flag) {
      return r;
    }
  }
};
// @lc code=end

// 第一种方式
// 我是这么想的，将heaters依次从0加到n，直到houses每个数都在变化后的heters中
// GG 超时了
const changHeaters = (arr, r) => {
  const hashSet = new Set();
  for (let i = 0; i < arr.length; i++) {
    for (let j = -r; j <= r; j++) {
      hashSet.add(arr[i] + j);
    }
  };
  return hashSet;
}
const findRadius = (houses, heaters) => {
  let r = -1;
  while(true) {
    r++;
    const nowSet = changHeaters(heaters, r);
    let flag = true;
    for (let i = 0; i < houses.length; i++) {
      if(!nowSet.has(houses[i])) {
        flag = false;
        continue;
      }
    };
    if(flag) {
      return r;
    }
  }
};