/*
 * @lc app=leetcode.cn id=412 lang=javascript
 *
 * [412] Fizz Buzz 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[]}
 */
const fizzBuzz = n => {
  const res = new Array();
  for (let i = 0; i < n; i++) {
    const mod15 = (i+1) % 15;
    const mod3 = (i+1) % 3;
    const mod5 = (i+1) % 5;
    if(!mod15) {
      res.push("FizzBuzz");
    }else if(!mod3) {
      res.push("Fizz");
    }else if(!mod5) {
      res.push("Buzz");
    }else{
      res.push((i+1).toString());
    }
  };
  return res;
};
// @lc code=end

