/*
 * @lc app=leetcode.cn id=447 lang=javascript
 *
 * [447] 回旋镖的数量 
 * 
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
const count = (arr, j) => {
  const hashMap = new Map();
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const now = (arr[j][0] - arr[i][0])**2 + (arr[j][1] - arr[i][1])**2;
    if(hashMap.has(now)) {
      hashMap.set(now, hashMap.get(now) + 1);
    }else {
      hashMap.set(now, 1);
    }
  };
  for (const [key, val] of hashMap) {
    if(val > 1) {
      sum += (val * (val-1))
    }
  }
  return sum;
}

const numberOfBoomerangs = points => {
  let sum = 0;
  for (let i = 0; i < points.length; i++) {
    sum += count(points, i)
  };
  return sum;
};
// Accepted
// 32/32 cases passed (204 ms)
// Your runtime beats 92.81 % of javascript submissions
// Your memory usage beats 71.33 % of javascript submissions (44 MB)
// @lc code=end

