/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度 
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
 * @return {number}
 */
// 迭代法
// 把每一层的节点都收集起来，直到为空
const maxDepth = root => {
  if(!root) return 0;
  const q = [];
  q.push(root);
  let ans = 0;

  while(q.length) {
    ans++;
    let size = q.length;
    // 这里巧妙，把上一层全部一出去，然后把下一层全部放进来
    while(size > 0) {
      const next = q.shift();

      next.left && q.push(next.left);
      next.right && q.push(next.right);
      size--;
    };
  };
  return ans;
};
// @lc code=end

// 递归法
const maxDepth_1 = root => {
  if(!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};