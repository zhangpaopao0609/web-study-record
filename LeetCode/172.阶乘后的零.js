/*
 * @lc app=leetcode.cn id=172 lang=javascript
 *
 * [172] 阶乘后的零
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 零的个数只与5的个数有关
const trailingZeroes = n => {
  let fives = 0;
  while(n > 0) {
    n = parseInt(n / 5);
    fives += n;
  };
 return fives;
};
// @lc code=end

// 这是阶乘的方法，但在这里不可行
const factorial = num => {
  if(num === 0) {
    return 1;
  }else if(num === 1) {
    return 1;
  }else {
    return factorial(num-1) * num;
  }
}

const trailingZeroes_1 = n => {
  let res = 0;
  let m = factorial(n);
  while(m % 10 === 0) {
    res++;
    m = m / 10;
  }
  return res;
 };


// ---------------------------------------------------------
// 零的个数只与5的个数有关
const trailingZeroes_2 = n => {
  let five = 0;
  for (let i = 5; i <= n; ) {
    let j = i;
    while(j % 5 === 0) {
      five++;
      j /= 5;
    }
    i += 5;
  }
  return five;
};


// 零的个数只与5的个数有关
const trailingZeroes_3 = n => {
  let fives = 0;
  let power_of_5 = 5;
  while(n >= power_of_5) {
    fives += parseInt(n / power_of_5);
    power_of_5 *= 5;
  };
 return fives;
};

