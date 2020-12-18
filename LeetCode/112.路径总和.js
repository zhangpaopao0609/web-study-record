/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
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
 * @param {number} sum
 * @return {boolean}
 */

const hasPathSum = (root, sum) => {
  if(!root) return false;
  if(!root.left && !root.right) return sum === root.val;
  return hasPathSum(root.left, sum-root.val) || hasPathSum(root.right, sum-root.val)
};
// @lc code=end


// BFS 方法
const BFS = tree => {
  if(!tree) return [];
  const q = [];
  q.push(tree);
  const res = [];

  while(q.length) {
    // 上一层的长度
    let size = q.length;

    while(size > 0) {
      size--;
      const next = q.shift();
      if(!next.left && !next.right) {
        res.push(next.val);
        continue;
      }
      if(next.left) {
        next.left.val += next.val;
        q.push(next.left);
      }
      if(next.right) {
        next.right.val += next.val;
        q.push(next.right);
      }
    }
  };
  return res;
}

const hasPathSum_1 = (root, sum) => {
  const res = BFS(root);
  return res.includes(sum);
};



// BFS 2
const hasPathSum_2 = (root, sum) => {
  if(!root) return false;
  const q = [];
  q.push(root);

  while(q.length) {
    // 上一层的长度
    let size = q.length;

    while(size > 0) {
      size--;
      const next = q.shift();
      if(!next.left && !next.right) {
        if(next.val === sum) return true;
        continue;
      }
      if(next.left) {
        next.left.val += next.val;
        q.push(next.left);
      }
      if(next.right) {
        next.right.val += next.val;
        q.push(next.right);
      }
    }
  };
  return false;
};