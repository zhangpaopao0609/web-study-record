/*
 * @lc app=leetcode.cn id=415 lang=javascript
 *
 * [415] 字符串相加
 *
 */

// @lc code=start
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function addStrings(num1, num2) {
  const l1 = num1.length;
  const l2 = num2.length;
  let i = l1 - 1;
  let j = l2 - 1;
  let res = ''; let add = 0;

  while (i >= 0 || j >= 0 || add) {
    const now1 = i < 0 ? 0 : num1.charAt(i) - '0';
    const now2 = j < 0 ? 0 : num2.charAt(j) - '0';
    const nowSum = add + now1 + now2;
    res = nowSum % 10 + res;
    add = nowSum > 9 ? 1 : 0;
    i--;
    j--;
  }
  return res;
}
// @lc code=end
