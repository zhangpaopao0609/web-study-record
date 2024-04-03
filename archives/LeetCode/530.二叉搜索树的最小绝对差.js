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

function getMinimumDifference(root) {
  if (!root) {
    return Number.POSITIVE_INFINITY;
  }
  const left = getMinimumDifference(root.left);
  const right = getMinimumDifference(root.right);
  const leftRoot = root.left ? root.val - root.left.val : Number.POSITIVE_INFINITY;
  const rightRoot = root.right ? root.right.val - root.val : Number.POSITIVE_INFINITY;
  return Math.min(left, right, leftRoot, rightRoot);
}
// @lc code=end

function getMinimumDifference(root) {
  const ans = []; let min = Number.POSITIVE_INFINITY;
  const res = (tree) => {
    if (!tree) {
      return;
    }
    res(tree.left);
    ans.push(tree.val);
    res(tree.right);
  };
  res(root);
  for (let i = 1; i < ans.length; i++) {
    if (ans[i] - ans[i - 1] < min) {
      min = ans[i] - ans[i - 1];
    }
  }
  return min;
}

function getMinimumDifference(root) {
  let min = Number.POSITIVE_INFINITY;
  let before = Number.NEGATIVE_INFINITY;
  const res = (tree) => {
    if (!tree) {
      return;
    }
    res(tree.left);
    if (tree.val - before < min) {
      min = tree.val - before;
    }
    before = tree.val;
    res(tree.right);
  };
  res(root);
  return min;
}
