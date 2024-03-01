/*
 * @lc app=leetcode.cn id=66 lang=javascript
 *
 * [66] 加一
 */

// @lc code=start
/**
 * @param {number[]} digits
 * @return {number[]}
 */

// 思想
// 加一
// 位数加1如未进位就算运算结束，
// 如进位（当前位变成了0），那么就从后往前循环加一即可
// 如果从后往前循环结束了都没退出程序，说明是[9, 9] 或[9, 9, 9]的情况，最后手动加1即可
const plusOne = digits => {
  const len = digits.length;
  for (let i = len-1; i >=0; i--) {
    digits[i] = ++digits[i] % 10;
    if(digits[i] !== 0) return digits
  }
  digits.unshift(1);
  return digits;
};
// @lc code=end

const plusOne_1 = digits => {
  const len = digits.length;
  for (let i = len-1; i >=0; i--) {
    if(digits[i]++ !== 9 ) {
      return digits
    }else{
      digits[i] = 0;
    }
  }
  digits.unshift(1);
  return digits;
};

