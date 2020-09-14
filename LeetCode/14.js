// 14. 最长公共前缀
// 编写一个函数来查找字符串数组中的最长公共前缀。

// 如果不存在公共前缀，返回空字符串 ""。

// 示例 1:

// 输入: ["flower","flow","flight"]
// 输出: "fl"
// 示例 2:

// 输入: ["dog","racecar","car"]
// 输出: ""
// 解释: 输入不存在公共前缀。
// 说明:

// 所有输入只包含小写字母 a-z 。

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
  let res = '';
  let flag = true;
  if (strs == null || strs.length == 0) {
    return "";
  }
  
  for (let i = 0; i < strs[0].length; i++) {
    const s = strs[0].charAt(i);
    strs.forEach(item => {
      item.charAt(i) !== s && (flag = false)
    })
    if(!flag) break
    res += s;
  }
  return res;
};

console.log(longestCommonPrefix(["rrrrdo","rrrrrracecar","rrrrcar"]));


//! @doc https://leetcode-cn.com/problems/longest-common-prefix/solution/zui-chang-gong-gong-qian-zhui-by-leetcode-solution/
// ! 横向比较
// class Solution {
//   public String longestCommonPrefix(String[] strs) {
//       if (strs == null || strs.length == 0) {
//           return "";
//       }
//       String prefix = strs[0];
//       int count = strs.length;
//       for (int i = 1; i < count; i++) {
//           prefix = longestCommonPrefix(prefix, strs[i]);
//           if (prefix.length() == 0) {
//               break;
//           }
//       }
//       return prefix;
//   }

//   public String longestCommonPrefix(String str1, String str2) {
//       int length = Math.min(str1.length(), str2.length());
//       int index = 0;
//       while (index < length && str1.charAt(index) == str2.charAt(index)) {
//           index++;
//       }
//       return str1.substring(0, index);
//   }
// }




// ! 分治的思想
// class Solution {
//   public String longestCommonPrefix(String[] strs) {
//       if (strs == null || strs.length == 0) {
//           return "";
//       } else {
//           return longestCommonPrefix(strs, 0, strs.length - 1);
//       }
//   }

//   public String longestCommonPrefix(String[] strs, int start, int end) {
//       if (start == end) {
//           return strs[start];
//       } else {
//           int mid = (end - start) / 2 + start;
//           String lcpLeft = longestCommonPrefix(strs, start, mid);
//           String lcpRight = longestCommonPrefix(strs, mid + 1, end);
//           return commonPrefix(lcpLeft, lcpRight);
//       }
//   }

//   public String commonPrefix(String lcpLeft, String lcpRight) {
//       int minLength = Math.min(lcpLeft.length(), lcpRight.length());       
//       for (int i = 0; i < minLength; i++) {
//           if (lcpLeft.charAt(i) != lcpRight.charAt(i)) {
//               return lcpLeft.substring(0, i);
//           }
//       }
//       return lcpLeft.substring(0, minLength);
//   }
// }
