/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 *
 * https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/
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
 * @return {number}
 */
// 递归
const height = tree => {
  if(!tree) return 0;
  if(!tree) {
    return 0;
  }else if(!tree.left) {
    return height(tree.right) + 1;
  }else if(!tree.right) {
    return height(tree.left) + 1;
  }else {
    return Math.min(height(tree.left), height(tree.right)) + 1;
  }
  
}

const minDepth = root => {
  if(!root) return 0;
  return height(root);
};
// @lc code=end

// BFS 方法
const minDepth_1 = root => {
  if(!root) return 0;
  let q = [];
  q.push(root);
  let ans = 0;

  while(q.length) {
    ans++;
    let size = q.length;
    while(size > 0) {
      const next = q.shift();
      if(!next.left && !next.right) return ans;

      next.left && q.push(next.left);
      next.right && q.push(next.right);
      size--;
    }
  }
};
