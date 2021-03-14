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
};

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
};

// 先序遍历就是 中 左 右
function Preorder_Traversal(tree, res) {
  if(tree == null) return;
  res.push(tree.val)
  Preorder_Traversal(tree.left, res);
  Preorder_Traversal(tree.right, res);
  return res;
};

function PreorderTraversal(tree) {
  return Preorder_Traversal(tree, [])
};

function PreorderTraversal_iteration(tree) {
  if(tree == null) return;
  const s = [];
  const res = [];
  while(tree || s.length) {
    while(tree) {
      res.push(tree.val);
      s.push(tree);
      tree = tree.left;
    };

    const now = s.pop();
    tree = now.right;    
  }
  return res;
};

// 后序遍历 左 右 中
function Postorder_Traversal(tree, res) {
  if(tree == null) return;
  Postorder_Traversal(tree.left, res);
  Postorder_Traversal(tree.right, res);
  res.push(tree.val)
  return res;
};

function PostorderTraversal(tree) {
  return Postorder_Traversal(tree, [])
};

function PostorderTraversal_iteration(tree) {
  if(tree == null) return;
  const s = [];
  const res = [];
  while(tree || s.length) {
    while(tree) {
      s.push(tree);
      tree = tree.left;
    };

    const now = s.pop();
    tree = now.right;   
    res.push(now.val) 
  }
  return res;
};

const tree = {
  val: 'A',
  left: {
    val: 'B',
    left: {
      val: 'D',
      left: { val: 'F', left: null, right: null },
      right: {
        val: 'G',
        left: { val: 'H', left: null, right: null },
        right: { val: 'I', left: null, right: null }
      }
    },
    right: { val: 'E', left: null, right: null }
  },
  right: { val: 'C', left: null, right: null }
};

console.log(MiddleOrderTraversal(tree));
console.log(MiddleOrderTraversal_iteration(tree));

console.log(PreorderTraversal(tree));
console.log(PreorderTraversal_iteration(tree));

console.log(PostorderTraversal(tree));
console.log(PostorderTraversal_iteration(tree));