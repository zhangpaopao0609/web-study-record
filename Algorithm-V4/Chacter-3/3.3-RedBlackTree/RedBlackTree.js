function Node(key, val, color='BLACK') {
  this.key = key;
  this.val = val;
  this.color = color;
  this.left = null;
  this.right = null;
  this.N = 0;
}

class RedBlackTree {
  isRed(node) {
    if(node == null) return false;
    return node.color === 'RED'
  }

  size(node) {
    return node ? node.N : 0;
  }

  rotateLeft(h) {
    const x = h.right;
    h.right = x.left;
    x.color = h.color;
    h.color = 'RED';
    x.N = h.N;
    h.N = this.size(h.left) + this.size(h.right) + 1;
    return x;
  }

  rotateright(h) {
    const x = h.left;
    h.left = x.right;
    x.color = h.color;
    h.color = 'RED';
    x.N = h.N;
    h.N = h.left.N + h.right.N + 1;
    return x;
  }

  filpColor(h) {
    h.color = 'RED';
    h.left.color = "BLACK";
    h.right.color = "BLACK";
  }

  put(tree, key, val) {     // 最终需要把 root 的 color 改为 BLACK
    if(tree == null) return new Node(key, val, "RED");
    if(tree.key > key) {
      tree.left = put(tree.left, key, val);
    }else if(tree.key < key) {
      tree.right = put(tree.right, key, val);
    }else {
      tree.val = val;
    };
    if(this.isRed(tree.right) && !this.isRed(tree.left)) this.rotateLeft(tree);
    if(this.isRed(tree.left) && this.isRed(tree.left.left)) this.rotateright(tree);
    if(this.isRed(tree.left) && this.isRed(tree.right)) this.filpColor(tree);
    tree.N = this.size(tree.left) + this.size(tree.right) + 1;
    return tree;
  }
}