const { MiddleOrderTraversal_iteration, MiddleOrderTraversal } = require('./BST_Traversal');

// BST 
class Node {
  constructor(key, val, N) {
    this.key = key;
    this.val = val;
    this.N = N;
    this.left = null;
    this.right = null;
  }
};

function get(tree, key) {
  if(!tree) return;
  if(tree.key > key) {
    return get(tree.left, key);
  }else if(tree.key < key) {
    return get(tree.right, key);
  }else{
    return tree.val;
  } 
};

function size(node) {
  return node ? node.N : 0;
};

function put(tree, key, val) {
  if(!tree) return new Node(key, val, 1);
  if(tree.key > key) {
    tree.left = put(tree.left, key, val);
  }else if(tree.key < key){
    tree.right = put(tree.right, key, val);
  }else {
    tree.val = val;
  };
  tree.N = size(tree.left) + size(tree.right) + 1;
  return tree;
};

function height(tree) {
  if(!tree) return 0;
  return Math.max(height(tree.left), height(tree.right))+1;
}

function max(tree) {
  if(!tree) return null;
  while(tree.right) {
    tree = tree.right;
  };
  return tree.key;
};

function minNode(tree) {
  if(!tree) return null;
  while(tree.left) {
    tree = tree.left;
  };
  return tree;
}

function min(tree) {
  if(!tree) return null;
  while(tree.left) {
    tree = tree.left;
  };
  return tree.key;
}

function floor(tree, key) {
  if(!tree) return null;
  if(key < tree.key) {
    return floor(tree.left, key);
  }else if(key > tree.key){
    if(key >= min(tree.right)) {
      return floor(tree.right, key);
    }else {
      return tree.key
    }
  }else {
    return tree.key;
  }
}

// 也就是刚好有 k 个结点是小于它的
// 如果左子树的结点数大于 k， 那就在左子树递归
// 如果左子树的结点数小于 k， 那就在右子树递归，但是因为左边已经有 左子树节点+1 个小于它了，所以 k 就变成 k - t - 1
// 如果左子树的结点数等于 k，那就根节点
function select(tree, k) {
  if(!tree) return null;
  const t = size(tree.left);
  if(t > k) {
    return select(tree.left, k);
  }else if(t < k) {
    return select(tree.right, k - t - 1);
  }else {
    return tree.key;
  }
}

// 也就是找到 key 的排名，跟 select 刚好相反
// 如果 key 小于树根结点值，那么在左子树递归
// 如果 key 大于树根结点值，那么就在右子树递归找排名，但是因为左边已经有 左子树结点+1 个小于它了，所以最终结果应该是 左子树结点数 + 右子树递归的排名结果
// 如果等于的话，那就根节点个数
function rank(tree, key) {
  if(!tree) return 0;
  if(key < tree.key) {
    return rank(tree.left, key);
  }else if(key > tree.key) {
    return rank(tree.right, key) + size(tree.left) + 1;
  }else {
    return size(tree.left);
  }  
}

// 递归遍历到右子树的右节点的子节点为 null，然后将其父节点的右节点指向其左节点
function deleteMax(tree) {
  if(!tree) throw Error("there is no data");
  if(tree.right == null) { 
    return tree.left;
  }
  tree.right = deleteMax(tree.right);
  tree.N = size(tree.left) + size(tree.right) + 1;
  return tree;
}

function deleteMin(tree) {
  if(!tree) throw Error("there is no data");
  if(tree.left == null) { 
    return tree.right;
  }
  tree.left = deleteMin(tree.left);
  tree.N = size(tree.left) + size(tree.right) + 1;
  return tree;
}

function deleteNode(tree, key) {
  if(!tree) return null;
  if(tree.key > key) {
    tree.left = deleteNode(tree.left, key);
  }else if(tree.key < key) {
    tree.right = deleteNode(tree.right, key);
  }else {
    if(!tree.left) return tree.right;
    if(!tree.right) return tree.left;
    const t = tree;
    tree = minNode(tree.right);
    tree.left = t.left;
    tree.right = deleteMin(t.right);
  };
  tree.N = size(tree.left) + size(tree.right) + 1;
  return tree;
}

function MiddleTraversal(tree) {
  if(tree == null) return;
  MiddleTraversal(tree.left);
  console.log(tree.val);
  MiddleTraversal(tree.right);
}

function keys(tree, low, high) {
  if(tree == null) return;
  if(tree.key > low) {
    keys(tree.left, low, high);
  }
  if(tree.key >= low && tree.key <= high) console.log(tree.val);
  if(tree.key < high) {
    keys(tree.right, low, high);
  }
}

let tree = null;
tree = put(tree, 4, 'd');
tree = put(tree, 1, 'a');
tree = put(tree, 2, 'b');
tree = put(tree, 3, 'c');
tree = put(tree, 6, 'f');
tree = put(tree, 7, 'g');
let h = height(tree);
console.log(tree);
console.log("MiddleOrderTraversal",MiddleOrderTraversal(tree));
console.log("MiddleOrderTraversal_iteration",MiddleOrderTraversal_iteration(tree));
console.log("height:",h);
console.log("max:", max(tree));
console.log("min:", min(tree));
console.log("floor:", floor(tree, 5));
console.log("select:", select(tree, 2));
console.log("rank:", rank(tree, 1));
// console.log("deleteMax", deleteMax(tree));
// console.log("deleteMin", deleteMin(tree));
// console.log("deleteNode", deleteNode(tree, 3));
// console.log("deleteNode", deleteNode(tree, 6));
// console.log("deleteNode", deleteNode(tree, 4));
// MiddleTraversal(tree)
keys(tree, 1, 5)