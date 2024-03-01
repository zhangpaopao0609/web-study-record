/*
 * @lc app=leetcode.cn id=405 lang=javascript
 *
 * [405] 数字转换为十六进制数
 * 
 */
// 十六进制
// 第一种，数学方式
// 十进制就是遇10进位，那么十六进制就是遇16进位即可
// - 十进制： num % 10 就是个位， 百位就是 ((num-(num % 10)) / 10) % 10 也就是减去个位除以10再取余数，然后依次可求到所有位数
// - 十六进制： num % 16 就是“个”位，“百“位就是((num-(num % 16)) / 16) % 16, 依次求取所有位数
// 只是有两个点需要注意：
// - 在于十六进制的进位, 0-9 即为数字0-9, 10-15 变成了a-f, 可用数字加上87即可。
// - 十进制负数可直接表示，但是十六进制不成，需要采用补码的方式，因为题目中给出给定的数确保在32位有符号整数范围内，因此用2的32次方加上负数即可变成补码

// 第二种，位运算方式
// 计算机中保存数字都是二进制，十六进制只是一种表现形式，因为二进制实在有些难读，十六进制就是将二进制中每4位转换成一位，如0001，就转换成Ox1, 如0101转换成Ox5, 如1011转换成Oxb，如1111转换成Oxf(其中Ox是十六进制的标识)。因此只需要依次得到num每4位然后转换成十六进制即可。
// 那么如何依次得到num的每个4位呢？
// 这里介绍两种方式：
// 1. 因为0xf在计算机中二进制标识其实为 00..00 1111 (前面28个零)，然后将 0xf 和 num 做与运算，就可以得到 num 最右边的 4 位，转换可得对应十六进制，然后如果将 Oxf 左移4位变成 00..00 1111 0000 (前面24个零)，然后与 num 做与运算，将与运算得到的结果再右移动4位然后转换可得对应十六进制，然后循环8次即可。
// 因为循环的结束条件是左移8次，所以当 num 左边位数（二进制）存在 0的话，就会导致转换的十六进制出现 0，因为需要去除一下 0.
// 2. 其实方式1是我最开始的做法，做着做着就知道做麻烦了。思路是一样的，利用 0xf 来得到 num 的右边4位，只是完全不需要去移动 0xf，只需要每次右移动 num 即可。相比较方式一，这样有三个好处：
// - 不用移动 0xf，只需要移动 num 即可。
// - 循环结束条件判断 num 是否为零即可。
// - 因为循环结束条件为 num 是否为零，因此转换的十六进制结果前面不会出现0，不需要去0。
// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
// 16进制
// 这个思路是真的清晰，明天早上我要来写题解
const toHex = num => {
  if(!num) return '0';
  let calc = 0xf;
  let res = '';

  while(num) {
    const now = (num & calc);
    res = (now > 9 ? String.fromCharCode(now + 87) : now) +res;
    num >>>= 4;
  }
  
  // while(res.charAt(0) === '0') {
  //   res = res.substr(1)
  // }

  return res;
};

// @lc code=end

const toHex = num => {
  if(!num) return '0';
  if(num < 0) num = Math.pow(2, 32) + num;
  let res = '';
  while(num) {
    const mod = num % 16;
    res = (mod > 9 ? String.fromCharCode(mod + 87) : mod) + res ;
    num = (num - mod) / 16;
  };
  return res;
};
// Accepted
// 100/100 cases passed (60 ms)
// Your runtime beats 100 % of javascript submissions
// Your memory usage beats 63.11 % of javascript submissions (37.6 MB)



// 16进制
// 这个思路是真的清晰，明天早上我要来写题解
// https://leetcode-cn.com/problems/convert-a-number-to-hexadecimal/solution/zen-yao-zhuan-hua-16jin-zhi-by-vailing/
const toHex = num => {
  if(!num) return '0';
  let calc = 0xf;
  let trans = 0;
  let res = '';

  while(trans <= 28) {
    const now = (num & calc) >>> trans;
    res = (now > 9 ? String.fromCharCode(now + 87) : now) +res;
    calc <<= 4;
    trans += 4;
  }
  
  while(res.charAt(0) === '0') {
    res = res.substr(1)
  }

  return res;
};

