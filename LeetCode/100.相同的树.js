/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
// 第一感觉就是二叉树的遍历
// 但是不需要遍历完，只需要一步一步的比较即可
const isSameTree = (p, q) => {
  if(p === null && q === null) {
    return true;
  }else if(p === null || q === null) { 
    return false;
  }else if(p.val !== q.val) {
    return false;
  }else {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }
};
// @lc code=end


const isSameTree_1 = (p, q) => {
  if(p === null && q === null) return true;
  if(p === null || q === null) return false;

  if(p.val !== q.val) return false;
  // 改进成尾递归
  // const left = isSameTree(p.left, q.left);
  // const right = isSameTree(p.right, q.right);

  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
