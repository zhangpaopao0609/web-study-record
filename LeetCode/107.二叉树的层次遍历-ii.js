/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层次遍历 II
 *
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
 * @return {number[][]}
 */
const levelOrderBottom = root => {
  if(!root) return [];
  const ans = [];
  const q = [];

  q.push(root);

  while(q.length) {
    const temp = [];
    let size = q.length;
    while(size > 0) {
      const next = q.shift();
      temp.push(next.val);
      next.left && q.push(next.left);
      next.right && q.push(next.right);
      size--;
    }
    ans.unshift(temp);
  }
  return ans;
};
// @lc code=end

