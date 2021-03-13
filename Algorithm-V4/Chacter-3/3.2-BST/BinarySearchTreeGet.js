// BST 是一颗二叉查找树（BST），其中每个结点都含有一个可以比较的键并且每个节借点的键都大于其左子树中的任意结点的键而小于右子树的任意结点的键

// 递归
function BST_recrsion(tree, key) {
  if(!tree) return;
  if(tree.key > key) {
    return BST_recrsion(tree.left, key);
  }else if(tree.key < key) {
    return BST_recrsion(tree.right, key);
  }else{
    return tree.val;
  } 
};

// 迭代
function BST_iteration(tree, key) {
  while(tree) {
    if(tree.key > key) {
      tree = tree.left;
    }else if(tree.key < key) {
      tree = tree.right;
    }else {
      return tree.val
    }
  };
  return;
};

