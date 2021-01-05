/*
 * @lc app=leetcode.cn id=501 lang=javascript
 *
 * [501] 二叉搜索树中的众数 
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
 * @return {number[]}
 */
// 中序遍历，左中右，BST的中序排列其实就是升序排列 
// 优化一下

const findMode = root => {
  let base = null, count = 1;
  let ans=[], maxCount = 1;

  const update = val => {
    if(val === base) {
      count++;
    }else {
      base = val;
      count = 1;
    };
    if(count === maxCount) {
      ans.push(val);
    }
    if(count > maxCount) {
      ans = [val];
      maxCount = count;
    };
  }

  const leftMidRight = (tree) => {
    if(!tree) return;
    leftMidRight(tree.left);
    update(tree.val);
    leftMidRight(tree.right);
  }

  leftMidRight(root);
  return ans;
};
// @lc code=end


// 中序遍历，左中右，BST的中序排列其实就是升序排列 
const leftMidRight = (tree, res) => {
  if(!tree) return;
  leftMidRight(tree.left, res);
  res.push(tree.val);
  leftMidRight(tree.right, res);
}

const findMode = root => {
  const res = [];
  leftMidRight(root, res);
  let base = null, count = 1;
  let ans=[], maxCount = 1;
  for (let i = 0; i < res.length; i++) {
    if(res[i] === base) {
      count++;
    }else {
      base = res[i];
      count = 1;
    };
    if(count === maxCount) {
      ans.push(res[i]);
    }
    if(count > maxCount) {
      ans = [res[i]];
      maxCount = count;
    };
  };
  return ans;
};
