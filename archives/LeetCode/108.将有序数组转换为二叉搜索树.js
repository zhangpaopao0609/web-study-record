/*
 * @lc app=leetcode.cn id=108 lang=javascript
 *
 * [108] 将有序数组转换为二叉搜索树
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
 * @param {number[]} nums
 * @return {TreeNode}
 */
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const sortedArrayToBST = nums => {
  let len = nums.length;
  if(len === 0) return null;
  if(len === 1) return new TreeNode(nums[0]);

  const mid = len >> 1;

  const tree = new TreeNode(nums[mid]);
  tree.left = sortedArrayToBST(nums.slice(0, mid));
  tree.right = sortedArrayToBST(nums.slice(mid+1));

  return tree;
};
// @lc code=end

