[toc]

# 大数之和（正负均可）

## 1. 前言

本来并不打算将一个纯 code 的题目作为一篇博文的，但是因为自己遇到了，也想到网上查找一番，结果并未发现一些较好的（思路清晰的）。因此，自己来完整的实现code以及梳理思路。

## 2. 大数之和

整个解题思路如下：

- 因为是大数，因此只能字符串按位相加
- 全部为正的情况，直接按位相加即可，相加的过程中注意保留进位即可
- 全部为负的情况，同样直接按位相加即可，最后添加上负号
- str1 为负， str2为正，需要比较 str1和 str2 的绝对值的大小，然后用大的减去小的，当然要注意正负的大小
- str2 为负， str1为正，同上

```js
// 请使用js实现一个简单的大数相加函数sum，要求实现正数相加及正负数相加。

// 测试用例:
// console.log(sum("9007199254740991", "1229007199254740993443")); 
// console.log(sum("9007199254740991", "-1229007199254740993443"));

function addStrings(str1, str2) {                 // 两数相加
  let i = str1.length-1;
  let j = str2.length-1;
  let res = '', add = 0;

  while(i >= 0 || j >= 0 || add) {
    let now1 = i < 0 ? 0 : str1.charAt(i) - '0';  // 当前值 或者 0
    let now2 = j < 0 ? 0 : str2.charAt(j) - '0';  // 当前值 或者 0
    let nowSum =  add + now1 + now2;              // 当前值加上进位项
    res = nowSum % 10 + res;                      // 当前项之和 
    add = nowSum > 9 ? 1 : 0;                     // 下一次的进位项
    i--;
    j--;
  };
  return res;
};

function minusStrings(str1, str2) {               // 两数相减, 大减去小
  let i = str1.length-1;                          
  let j = str2.length-1;
  let res = '', minus = 0;

  while(i >= 0 || j >= 0) {              
    let now1 = i < 0 ? 0 : str1.charAt(i) - '0';  
    let now2 = j < 0 ? 0 : str2.charAt(j) - '0';
    let nowMinus = now1 - now2 - minus;   
    // 如果 nowMinus 大于等于零，那么减得够
    if(nowMinus >= 0) {
      res = nowMinus + res;
      minus = 0;
    }else {
      res = (10 + nowMinus) + res;                // 减不够，拿上一位的
      minus = 1;
    }
    i--;
    j--;
  };
  while(res[0] === '0') {                         // 去掉前面的 0
    res = res.slice(1);
  }
  return res;
}

function compare(str1, str2) {                    // 比较大小
  let l1 = str1.length;
  let l2 = str2.length;

  if(l1 > l2) {                                   
    return true;
  }else if(l1 < l2) {
    return false;
  }else {                                        // 如果长度相同，那么从前往后依次比较
    let i = 0;
    while(i <= l1) {
      if(str1[i] > str2[i]) {
        return true;
      }else if(str1[i] < str2[i]) {
        return false;
      }else {
        i++;
      }
    };
    return true;
  }
}

function sum(str1, str2) {
  if(str1[0] !== '-' && str2[0] !== '-') {    // 说明全为正
    return addStrings(str1, str2);
  }
  if(str1[0] === '-' && str2[0] === '-') {    // 说明全为负
    return '-' + addStrings(str1.slice(1), str2.slice(1));
  }
  if(str1[0] === '-' && str2[0] !== '-') {    // 说明 str1 为负，str2 为正
    if(compare(str1.slice(1), str2)) {       // 说明 str1 绝对值大于 str2 绝对值 
      return '-' + minusStrings(str1.slice(1), str2);
    }else {
      return minusStrings(str2, str1.slice(1));
    }
  }
  if(str1[0] !== '-' && str2[0] === '-') {    // 说明 str1 为正，str2 为负
    if(compare(str1, str2.slice(1))) {       // 说明 str1 绝对值大于 str2 绝对值 
      return minusStrings(str1, str2.slice(1));
    }else {
      return '-' + minusStrings(str2.slice(1), str1);
    }
  }
}

console.log(sum("-90071", "-101111111111111111111111111111111111111111110"))
```

思路很简单，理清楚后代码就呼之欲出了。