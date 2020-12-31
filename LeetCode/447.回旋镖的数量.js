/*
 * @lc app=leetcode.cn id=447 lang=javascript
 *
 * [447] 回旋镖的数量 
 * 
 */

// 题目的意思很简单，就是找出距离某个点相同的其他点，然后进行组合，比如
// [[1,1],[2,2],[3,3]],其中[2,2]点距离[1,1]和[3,3]的距离相同，同时因为需要考虑顺序，
// 所以这就是一个排列问题，[2,2]点距离两个点相同，那么和[2,2]构成的结果为21。
// 同样的，如果与 [2,2] 点距离相同的存在3个点，那么和[2,2]构成的结果为32，就是排列，从n个去除两个排列。

// 因此，只要计算出每一个点与其他点的距离，然后记录每一中距离的个数，个数大于1的话，就说明存在相同的距离，一次按照排列加起来即可！

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

