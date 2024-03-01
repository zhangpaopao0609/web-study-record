// 20. 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。

// 示例 1:

// 输入: "()"
// 输出: true
// 示例 2:

// 输入: "()[]{}"
// 输出: true
// 示例 3:

// 输入: "(]"
// 输出: false
// 示例 4:

// 输入: "([)]"
// 输出: false
// 示例 5:

// 输入: "{[]}"
// 输出: true

/**
 * @param {string} s
 * @return {boolean}
 */
// var isValid = function(s) {
//   if(s == '' && s.length%2 != 0) return true;
  
//   const obj = {
//     '{': 1,
//     '}': -1,
//     '[': 2,
//     ']': -2,
//     '(': 3,
//     ')': -3
//   }
//   let hash = {};
//   for (let i = 0; i < s.length; i++) {
//     hash[obj[s[i]]] = i+1;
//   }
//   console.log(hash)
//   for (const key in hash) {
//     if(key>0 && hash[-parseInt(key)] && (hash[-parseInt(key)]-hash[key])%2 != 0) {
      
//     }else{
//       return false;
//     }
//     if(hash[key] === s.length/2) return true;
//   }
// };

// console.log(isValid("({{{{}}}))"));


/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  if(s == '' && s.length%2 != 0) return true;
  const dic = {'}': '{',  ']': '[', ')': '(', '?': '?'};
  
  let arr = [];
  for (let i = 0; i < s.length; i++) {
    
    if(arr.length > 0 && dic[s.charAt(i)] == arr[arr.length-1] ) {
      arr.pop();
    }else{
      arr.push(s.charAt(i));    
    }
  }
  return arr.length == 0;
};

console.log(isValid("(())"));