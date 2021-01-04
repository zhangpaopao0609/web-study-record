/*
 * @lc app=leetcode.cn id=492 lang=javascript
 *
 * [492] 构造矩形
 * 
 */

// @lc code=start
/**
 * @param {number} area
 * @return {number[]}
 */
// 二分
const constructRectangle = area => {
  let s = Math.sqrt(area);
  let w = Math.floor(s);
  while(area % w) {
    w -= 1;
  };
  return [area / w, w];
};
// @lc code=end

