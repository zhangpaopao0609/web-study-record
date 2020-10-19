class Node {    // 定义节点
  constructor(key, val, N) {
    this.key = key;
    this.val = val;
    this.N = N;
    this.left = null;
    this.right = null;
  }
}

function put(root, key, val) {
  const z = new Node(key, val, 1);
  if(root === null) {
    root = z;
    return root;
  }
  let parent = null, x = root;
  x.N = size(x.left) + size(x.right) + 1;
  while(x !== null) {
    parent = x;
    x.N += 1;
    if(key > x.key) x = x.right;
    else if(key < x.key) x = x.left;
    else {
      x.val = val;
      return root;
    }
  }
  if(key > parent.key) parent.right = z;
  else parent.left = z;
  return root;
}

function get(root, key) {
  let x = root;
  while(x !== null) {
    if(key > x.key) x = x.right;
    else if(key < x.key) x = x.left;
    else return x.val;
  }
  return null;
}

function size(n) {
  if(n === null) return 0;
  return n.N;
} 

let x = null; 
x = put(x, 5, 'f');
// console.log(x);
x = put(x, 0, 'a');
x = put(x, 8, 'i');
x = put(x, 3, 'd');
x = put(x, 2, 'c');
x = put(x, 7, 'h');
x = put(x, 6, 'g');
x = put(x, 1, 'b');
x = put(x, 4, 'e');
console.log(x);

const res = get(x, 4);
console.log(res);