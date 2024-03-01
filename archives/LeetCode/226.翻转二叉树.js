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
// 迭代
const invertTree = root => {
  if(!root) return null;
  const q = [];
  q.push(root);

  while(q.length) {
    let size = q.length;
    while(size) {
      const next = q.shift();
      const left = next.left;
      const right = next.right;

      next.left = right;
      next.right = left;

      next.left && q.push(next.left);
      next.right && q.push(next.right);
      size--;
    }
  }
  return root;
};

// @lc code=end

// 递归
const invertTree_1 = root => {
  if(!root) return null;
  const tree = new TreeNode(root.val);
  tree.left = invertTree_1(root.right);
  tree.right = invertTree_1(root.left);
  return tree;
};

// Accepted
// 68/68 cases passed (72 ms)
// Your runtime beats 97.87 % of javascript submissions
// Your memory usage beats 35.25 % of javascript submissions (38.9 MB)

