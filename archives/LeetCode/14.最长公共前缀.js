/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀 
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
const longestCommonPrefix = strs => {
  if (strs == null || strs.length === 0) return '';
  return longestCommonPrefixDivide(strs, 0, strs.length - 1);
}

const longestCommonPrefixDivide = (strs, left, right) => {
  if(left === right) return strs[left];
  const mid = Math.floor((right - left) / 2) + left;
  const leftLCP = longestCommonPrefixDivide(strs, left, mid);
  const rightLCP = longestCommonPrefixDivide(strs, mid + 1, right);
  return findPrefixMerge(leftLCP, rightLCP);
}

const findPrefixMerge = (a, b) => {
  const len = Math.min(a.length, b.length);
  let index = 0;
  for (let i = 0; i < len; i++) {
    if(a[i] === b[i]) {
      index++;
    }else {
      return a.substr(0, index);
    }
  }
  return a.substr(0, len);
}
// @lc code=end

//1.  暴力法
// 直接一个一个来比较，首字母，然后第二字母

//2. 
// 第一个和第二个比较，得出一个前缀
// 然后前缀和第三个，又得出一个
// 直到最后一个元素
// 如果到达最后一个后还是长度，就是最长前缀，否则就不存在了
const longestCommonPrefix_1 = strs => {
  const len = strs.length;
  if(!len) return '';
  const prefix = '';
  let beforePrefix = strs[0];
  for (let i = 0; i < len; i++) {
    beforePrefix = findPrefix_1(beforePrefix, strs[i+1]);
    if(beforePrefix.length === 0) return '';
  };
  return beforePrefix;
};

const findPrefix_1 = (a, b) => {
  const len = Math.min(a.length, b.length);
  let index = 0;
  for (let i = 0; i < len; i++) {
    if(a[i] === b[i]) {
      index++;
    }else {
      return a.substr(0, index);
    }
  }
  return a.substr(0, len);
}

// 2.2 横向比较
const longestCommonPrefix_2 = strs => {
  if (strs == null || strs.length === 0) return '';
  const len = strs.length;
  const prefix = '';
  let beforePrefix = strs[0];
  for (let i = 1; i < len; i++) {
    beforePrefix = findPrefix(beforePrefix, strs[i]);
    if(beforePrefix.length === 0) return '';
  };
  return beforePrefix;
};

const findPrefix = (a, b) => {
  const len = Math.min(a.length, b.length);
  let index = 0;
  while (index < len && a.charAt(index) === b.charAt(index)) {
    index++;
  }
  return a.substr(0, index);
}


//! 3 分治的思想， 不在于秀代码，而在于思想，分治的思想
//! 归并的思想
const longestCommonPrefix_3 = strs => {
  if (strs == null || strs.length === 0) return '';
  return longestCommonPrefixDivide(strs, 0, strs.length - 1);
}

const longestCommonPrefixDivide = (strs, left, right) => {
  if(left === right) return strs[left];
  const mid = Math.floor((right - left) / 2) + left;
  const leftLCP = longestCommonPrefixDivide(strs, left, mid);
  const rightLCP = longestCommonPrefixDivide(strs, mid + 1, right);
  return findPrefixMerge(leftLCP, rightLCP);
}

const findPrefixMerge = (a, b) => {
  const len = Math.min(a.length, b.length);
  let index = 0;
  for (let i = 0; i < len; i++) {
    if(a[i] === b[i]) {
      index++;
    }else {
      return a.substr(0, index);
    }
  }
  return a.substr(0, len);
}
