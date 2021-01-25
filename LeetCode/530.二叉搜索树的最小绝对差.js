/*
 * @lc app=leetcode.cn id=530 lang=javascript
 *
 * [530] 二叉搜索树的最小绝对差 
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
// 1. 中序遍历
// 2. 递归

const getMinimumDifference = root => {
  if(!root) return Infinity;
  const left = getMinimumDifference(root.left);
  const right = getMinimumDifference(root.right);
  const leftRoot = root.left ? root.val - root.left.val : Infinity;
  const rightRoot = root.right ? root.right.val - root.val : Infinity;
  return Math.min(left, right, leftRoot, rightRoot);
};
// @lc code=end

const getMinimumDifference = root => {
  let ans = [], min = Infinity;
  const res = tree => {
    if(!tree) return;
    res(tree.left);
    ans.push(tree.val);
    res(tree.right);
  };
  res(root);
  for (let i = 1; i < ans.length; i++) {
    if(ans[i] - ans[i-1] < min) min = ans[i] - ans[i-1];
  }
  return min;
};

const getMinimumDifference = root => {
  let min = Infinity;
  let before = -Infinity;
  const res = tree => {
    if(!tree) return;
    res(tree.left);
    if(tree.val - before < min) {
      min = tree.val - before;
    };
    before = tree.val;
    res(tree.right);
  };
  res(root);
  return min;
};