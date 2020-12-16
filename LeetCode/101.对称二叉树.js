/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * @return {boolean}
 */
const check = (u, v) => {
  const q = [];
  q.push(u);
  q.push(v);

  while(q.length) {
    u = q.shift();
    v = q.shift();

    if(!u && !v) continue;
    if((!u || !v) || (u.val !== v.val)) return false;

    q.push(u.left);
    q.push(v.right);

    q.push(u.right);
    q.push(v.left);
  };

  return true;
}

const isSymmetric = root => {
  if(!root) return true;
  return check(root.left, root.right);
};
// @lc code=end

// 递归
const check_1 = (p, q) => {
  if(!p && !q) return true;
  if(!p || !q) return false;
  return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);
}

const isSymmetric_1 = root => {
  if(!root) return true;
  return check(root.left, root.right);
};
