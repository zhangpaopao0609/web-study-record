/*
 * @lc app=leetcode.cn id=404 lang=javascript
 *
 * [404] 左叶子之和 
 * 
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
// 递归
const sumOfLeftLeaves = root => {
  if(!root) return 0;
  if(root.left) {
    if(!root.left.left && !root.left.right) {
      return root.left.val + sumOfLeftLeaves(root.right);
    }else{
      return sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right)
    }
  }else {
    return sumOfLeftLeaves(root.right)
  }
};
// @lc code=end

