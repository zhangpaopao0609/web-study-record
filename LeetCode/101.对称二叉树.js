/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @return {boolean}
 */
const check = (p, q) => {
  if(!p && !q) return true;
  if(!p || !q) return false;
  return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
}

const isSymmetric = root => {
  if(!root) return true;
  return check(root.left, root.right);
};
// @lc code=end

