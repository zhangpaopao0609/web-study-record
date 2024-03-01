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
// 线性筛
// 埃氏筛其实还是存在冗余的标记操作，比如对于45这个数，它会同时被 3,5两个数标记为合数，因此我们优化的目标是让每个合数只被标记一次，这样时间复杂度即能保证为O(n)

const countPrimes = n => {
  const isPrime = new Array(n).fill(1);
  const primes = [];
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      primes.push(i);
    }
    for (let j = 0; j < primes.length && i*primes[j] < n; j++) {
      isPrime[i * primes[j]] = 0;
      if (i % primes[j] === 0) {
        break;
      }
    }
  }
  return primes.length;
};
// @lc code=end


// 这是我的枚举法，等会看看别人的枚举法，都优雅些，跪了
const isPrime_1 = num => {
  for (let i = 2; i <= parseInt(Math.sqrt(num)); i++) {
    if (Math.floor(num / i) === num / i) return false;
  }
  return true;
}

const countPrimes_1 = n => {
  if (n === 1 || !n) return 0;
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime_1(i)) count++;
  }
  return count;
};

// ---------------------------------------------------
// 别人的枚举法
const isPrime = num => {
  for (let i = 2; i ** 2 <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const countPrimes_2 = n => {
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) count++;
  }
  return count;
};

// -----------------------------------------
// 埃氏筛
const countPrimes_3 = n => {
  const isPrime = Array(n).fill(1);
  let ans = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime[i]) {
      ans += 1;
      for (let j = i ** 2; j < n; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  return ans;
};
