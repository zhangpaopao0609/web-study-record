// 中序遍历就是 左 中 右
function MiddleOrder_Traversal(tree, res) {
  if(tree == null) return;
  MiddleOrder_Traversal(tree.left, res);
  res.push(tree.val)
  MiddleOrder_Traversal(tree.right, res);
  return res;
};

function MiddleOrderTraversal(tree) {
  return MiddleOrder_Traversal(tree, [])
}

// 中序遍历的非递归实现
function MiddleOrderTraversal_iteration(tree) {
  if(tree == null) return;
  const s = [];
  const res = [];
  while(s.length || tree) {
    while(tree) {
      s.push(tree);
      tree = tree.left;
    }

    const now = s.pop();
    res.push(now.val);
    tree = now.right;
  };
  return res;
}

module.exports = {MiddleOrderTraversal_iteration, MiddleOrderTraversal};