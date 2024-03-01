// #### 题目描述
// 给一个数字n，打印出 1-n 中是 7 的倍数和包含 7 的所有数字，不可使用字符串方式。
// #### code
// 思路其实非常的简单， 首先倍数取余即可得到，包含 7 的通过判断每一位中是否包含 7 即可。

```js
function seven(n) {
  const res = [];
  for (let i = 7; i <= n; i++) {
    if(i % 7 === 0) {
      res.push(i);
    }else {
      let k = i;
      while(1) {
        // 依次计算 k 的位数看是否为 7
        const now = parseInt(k / 10);
        if(k - now * 10 === 7) {
          res.push(i);
          break;
        };
        k = now;
        if(k < 7) {
          break;
        }
      }
    }
  }
  return res;
};

const res = seven(117);
console.log(res);
```

// 之前刷 LeetCode 的时候记忆中有更加合理的方式，这里暂时记录这种方式。
