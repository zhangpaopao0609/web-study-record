// 中序遍历就是 左 中 右
function MiddleOrderTraversal(tree) {
  if(tree == null) return;
  MiddleOrderTraversal(tree.left);
  console.log(tree.val);
  MiddleOrderTraversal(tree.right);
}

