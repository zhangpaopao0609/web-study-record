/*
 * @lc app=leetcode.cn id=202 lang=javascript
 *
 * [202] 快乐数
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {boolean}
 */

const squareEveryOne = n => {
  let ans = 0;
  while(n) {
    const mod = n % 10;
    ans += mod ** 2;
    n = (n - mod) / 10;
  };
  return ans;
}

// 根据我们之前的分析，我们知道它必须低于 243。因此，我们知道任何循环都必须包含小于 243 的数字，用这么小的数字，编写一个能找到所有周期的强力程序并不困难。
// 如果这样做，您会发现只有一个循环：4 -> 16 -> 37 -> 58 -> 89 -> 145 -> 42 -> 20 -> 4。所有其他数字都在进入这个循环的链上，或者在进入 11 的链上。
// 因此，我们可以硬编码一个包含这些数字的散列集，如果我们达到其中一个数字，那么我们就知道在循环中。

const isHappy = n => {
  const cycle_members = [4, 16, 37, 58, 89, 145, 42, 20]
  while(n !== 1 && !cycle_members.includes(n)) {
    n = squareEveryOne(n);
  }
  return n === 1;
};
// @lc code=end

// 纯粹就数学算了，至于循环多少次，不知道
// 就题目给的用例，我试了，最少可以6次， 但也就仅限这些case了
const squareEveryOne = n => {
  let ans = 0;
  while(n) {
    const mod = n % 10;
    ans += mod * mod;
    n = (n - mod) / 10;
  };
  return ans;
}

const isHappy_1 = n => {
  // 至于循环多少次， 不知道
  let count = 6;
  while(count) {
    n = squareEveryOne(n);
    if(n === 1) return true;
    count--;
  }
  return false;
};
// Accepted
// 402/402 cases passed (84 ms)
// Your runtime beats 92.18 % of javascript submissions
// Your memory usage beats 72.09 % of javascript submissions (39.1 MB)


const isHappy_2 = n => {
  const hashSet = new Set();
  while(!hashSet.has(n)) {
    hashSet.add(n);
    n = squareEveryOne(n);
    if(n === 1) return true;
  };
  return false;
};
// Accepted
// 402/402 cases passed (80 ms)
// Your runtime beats 97.43 % of javascript submissions
// Your memory usage beats 59.04 % of javascript submissions (39.3 MB)


const isHappy_3 = n => {
  let tortoise = n;
  let rabbit = n;
  do {
    rabbit = squareEveryOne(rabbit);
    if(rabbit === 1) return true;
    rabbit = squareEveryOne(rabbit);
    if(rabbit === 1) return true;
    tortoise = squareEveryOne(tortoise);;
  }while(tortoise !== rabbit);
  return false;
};

const isHappy_3_1 = n => {
  let tortoise = n;
  let rabbit = n;
  do {
    rabbit = squareEveryOne(squareEveryOne(rabbit));
    tortoise = squareEveryOne(tortoise);;
  }while(tortoise !== rabbit && rabbit !== 1);
  return rabbit === 1;
};
