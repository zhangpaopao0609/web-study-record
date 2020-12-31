/*
 * @lc app=leetcode.cn id=461 lang=javascript
 *
 * [461] 汉明距离
 * 
 */

// @lc code=start
/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const hammingDistance = (x, y) => {
  let res = 0;
  let start = x ^ y;
  while(start) {
    if(start & 1)
      res++;
    start >>= 1;
  };
  return res;
};
// @lc code=end

const hammingDistance = (x, y) => {
  let res = 0;
  let start = x ^ y;
  while(start) {
    start = start & (start - 1);
    res++;
  };
  return res;
};

