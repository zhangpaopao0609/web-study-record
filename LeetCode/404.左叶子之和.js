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
// 迭代 BFS
const sumOfLeftLeaves = root => {
  if(!root) return 0;
  const q = [];
  let sum = 0;
  q.push(root);

  while(q.length) {
    let size= q.length;

    while(size) {
      const next = q.shift();
      
      next.left && q.push(next.left);
      next.right && q.push(next.right);

      if(next.left && !next.left.left && !next.left.right) sum+= next.left.val;
      size--;
    }
  };
  return sum;
};
// @lc code=end

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
// Accepted
// 102/102 cases passed (76 ms)
// Your runtime beats 97.43 % of javascript submissions
// Your memory usage beats 46.38 % of javascript submissions (39.6 MB)

// 迭代 BFS
const sumOfLeftLeaves = root => {
  if(!root) return 0;
  const q = [];
  let sum = 0;
  q.push(root);

  while(q.length) {
    let size= q.length;

    while(size) {
      const next = q.shift();
      
      next.left && q.push(next.left);
      next.right && q.push(next.right);

      if(next.left && !next.left.left && !next.left.right) sum+= next.left.val;
      size--;
    }
  };
  return sum;
};

