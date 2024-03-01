/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const high = tree => {
  if(!tree) return 0;
  const l = high(tree.left);
  const r = high(tree.right);
  if(l === -1 || r === -1 || Math.abs(l - r) > 1) {
    return -1;
  }else {
    return Math.max(l, r) + 1;
  }
}

const isBalanced = root => {
  if(!root) return true;
  return high(root) >= 0;
};
// @lc code=end

// 自顶向下的递归
const high = tree => {
  if(!tree) return 0;
  return Math.max(high(tree.left), high(tree.right)) + 1;
}

const isBalanced = root => {
  if(!root) return true;
  return Math.abs(high(root.left) - high(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right);
};
