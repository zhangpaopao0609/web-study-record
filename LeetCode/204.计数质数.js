/*
 * @lc app=leetcode.cn id=204 lang=javascript
 *
 * [204] 计数质数 
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
// 埃氏筛
const countPrimes = n => {
  const isPrime = Array(n).fill(1);
  let ans = 0;
  for (let i = 2; i < n; i++) {
    if(isPrime[i]) {
      ans += 1;
      for (let j = i**2; j < n; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  return ans;
};
// @lc code=end


// 这是我的枚举法，等会看看别人的枚举法，都优雅些，跪了
const isPrime_1 = num => {
  for (let i = 2; i <= parseInt(Math.sqrt(num)); i++) {
    if(Math.floor(num / i) === num / i) return false;
  }
  return true;
}

const countPrimes_1 = n => {
  if(n===1 || !n) return 0; 
  let count = 0;
  for (let i = 2; i < n; i++) {
    if(isPrime_1(i)) count++;
  }
  return count;
};

// ---------------------------------------------------
// 别人的枚举法
const isPrime = num => {
  for (let i = 2; i**2 <= num; i++) {
    if(num % i === 0) return false;
  }
  return true;
}

const countPrimes_2 = n => {
  let count = 0;
  for (let i = 2; i < n; i++) {
    if(isPrime(i)) count++;
  }
  return count;
};
