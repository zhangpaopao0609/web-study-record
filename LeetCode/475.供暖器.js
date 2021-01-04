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
// 这里如果把两个数组都排序，那么就可以直接用双指针
const findRadius = (houses, heaters) => {
  let max = 0, hol = houses.length, hel = heaters.length;
  let i = j = 0, flag = false;
  houses = houses.sort((a, b) => a - b);
  heaters = heaters.sort((a, b) => a - b);
  while (i < hol) {
    if(j === hel) {
      flag = true;
      break;
    };
    if(heaters[j] >= houses[i]) {
      if(j === 0) {
        max = Math.max(max, heaters[j] - houses[i]);
      }else {
        max = Math.max(max, Math.min(heaters[j] - houses[i], houses[i] - heaters[j-1]));
      }
      i++;
    }else {
      j++;
    }
  };
  if(flag) max = Math.max(max, houses[hol-1] - heaters[hel-1]);
  return max;
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


// 要想为每个房子都供暖，其实，每个房子的角度就是希望找到离自己最近的供暖器就行，然后记录下每个房子里供暖器最远一个就行
// 因此，首先将供暖器排序，然后再利用二分找到每个房子最近的供暖器
const findNearestHeater = (heaters, house) => {
  const len = heaters.length;
  let l = 0, r = len - 1;
  while(l <= r) {
    const m = l + ((r - l) >> 1);
    if(house > heaters[m]) {
      l = m + 1;
    }else if(house < heaters[m]) {
      r = m - 1;
    }else {
      return 0;
    };
  };
  if(l === len) {
    return house - heaters[r];
  }else if(l === 0) {
    return heaters[0] - house;
  }else {
    return Math.min(house - heaters[l-1], heaters[l] - house);
  }
}

const findRadius = (houses, heaters) => {
  let max = 0;
  heaters = heaters.sort((a, b) => a - b);
  for (let i = 0; i < houses.length; i++) {
    const now = findNearestHeater(heaters, houses[i]);
    if(now > max) {
      max = now;
    };
  };
  return max;
};