/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先 
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
// 这是一个二叉搜索树
// 最基本的性质我都不知道了吗？
// 左 < 中 < 右  
// 优化一下  不需要递归呀
const lowestCommonAncestor = (root, p, q) => {
  let ancestor = root;
  while(true) {
    if(p.val < ancestor.val && q.val < ancestor.val) {
      ancestor = ancestor.left;
    }else if(p.val > ancestor.val && q.val > ancestor.val) {
      ancestor = ancestor.right;
    }else {
      return ancestor;
    }
  }
};
// @lc code=end


// 这是一个二叉搜索树
// 最基本的性质我都不知道了吗？
// 左 < 中 < 右
const lowestCommonAncestor_1 = (root, p, q) => {
  const val = root.val;
  const max = Math.max(p.val, q.val);
  const min = Math.min(p.val, q.val);
  // 其中一个为父节点
  if(max === val || min === val) return root;
  // 在root两边
  if(max > val && min < val) return root;
  // 都在左边
  if(max < val) {
    return lowestCommonAncestor(root.left, p, q);
  }else {
    return lowestCommonAncestor(root.right, p, q);
  }
};


// 这是一个二叉搜索树
// 最基本的性质我都不知道了吗？
// 左 < 中 < 右  
// 优化一下
const lowestCommonAncestor_2 = (root, p, q) => {
  if(p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  }else if(p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  }else {
    return root;
  }
};