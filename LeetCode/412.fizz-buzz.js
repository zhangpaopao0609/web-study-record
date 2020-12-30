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
// 字符串拼接方式
// 这种方式并不会减少时间复杂度，但是写起来会更加优雅
const fizzBuzz = n => {
  const res = new Array();
  for (let i = 1; i <= n; i++) {
    const divisibleBy3 =  i % 3 === 0;
    const divisibleBy5 = i % 5 === 0;
    let iForStr = '';
    if(divisibleBy3) {
      iForStr += 'Fizz';
    }
    if(divisibleBy5) {
      iForStr += 'Buzz';
    }
    if(!iForStr){
      iForStr += i.toString();
    };
    res.push(iForStr);
  };
  return res;
};
// @lc code=end
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
