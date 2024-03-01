/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干 
 * 
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
// 先排序，再依次比较即可
const findContentChildren = (g, s) => {
  g = g.sort((a,b) => a - b);
  s = s.sort((a,b) => a - b);
  let i=j=0;
  while(i < g.length && j < s.length) {
    if(g[i] <= s[j]) {
      i++;
    }
    j++;
  };
  return i;
};
// Accepted
// 21/21 cases passed (108 ms)
// Your runtime beats 94.29 % of javascript submissions
// Your memory usage beats 37.32 % of javascript submissions (40.4 MB)
// @lc code=end

