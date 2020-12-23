/*
 * @lc app=leetcode.cn id=226 lang=javascript
 *
 * [226] 翻转二叉树
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
 * @return {TreeNode}
 */
const invertTree = root => {
  if(!root) return null;
  const tree = new TreeNode(root.val);
  tree.left = invertTree(root.right);
  tree.right = invertTree(root.left);
  return tree;
};

// Accepted
// 68/68 cases passed (72 ms)
// Your runtime beats 97.87 % of javascript submissions
// Your memory usage beats 35.25 % of javascript submissions (38.9 MB)
// @lc code=end

