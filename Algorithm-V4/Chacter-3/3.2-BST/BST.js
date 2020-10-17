class Node {    // 定义节点类
    constructor(key, val, N) {
        this.key = key;
        this.val = val;
        this.N = N;
        this.left = null;
        this.right = null;
    }
}

// 以x为根节点的BST上查找键key
function get(x, key) {
    if(x == null) return null;
    if(key > x.key) {
        return get(x.right, key);
    }else if(key < x.key) {
        return get(x.left, key);
    }else {
        return x.val;
    }
}

// 在以x为根节点的BST上查入key,val
function put(x, key, val) {
    if(x == null) return new Node(key, val, 1);
    if(key > x.key) {
        x.right = put(x.right, key, val);
    }else if(key < x.key) {
        x.left = put(x.left, key, val);
    };
    x.N = size(x.left) + size(x.right) + 1;
    return x;
}

function size(x) {
    if(x == null) return 0;
    return x.N;
}

// 二叉查找树的最小key
function min(x) {
    if(x === null) return null;
    if(x.left === null) return x.key;
    min(x.left);
}

// 二叉查找树的最大key
function max(x) {
    if(x === null) return null;
    if(x.right === null) return x.key;
    max(x.right);
}

// 二叉查找树小于等于某个键key的最大值
// 如果 key < root,那么这个键一定在左子树上
// 如果 key > root,那么只有当根节点右子树中存在小于等于key的节点时，小于等于key的最大键才会出现在右子树中，否则根节点就是小于等于key的最大键
function floor(x, key) {
    if(x === null) return null;
    if(key === x.key) return x;
    if(key < x.key) return floor(x.left, key);
    let t = floor(x.right, key);
    if(t !== null) return t;
    else return x;
}

// select
// 选择排名为k的节点
function select(x, k) {
    if(x === null) return null;
    const t = size(x.left);
    if(t > k) return select(x.left, k);
    else if(t < k) return select(x.right, k-t-1);
    else return x;
}

// rank
// 返回给定键的排名
function rank(x, key) {
    if(x === null) return 0;
    if(key < x.key) return rank(x.left, key);
    else if(key > x.key) return 1+ size(x.left) + rank(x.right, key);
    else return size(x.left);
}

// 删除最小键
// 最小键就在左子树直到null，删除就是返回右链接
function deleteMin(x) {
    if(x === null) return null;
    if(x.left === null) return x.right;
    x.left = deleteMin(x.left);
    x.N = size(x.left) + size(x.right) + 1;
    return x;
}

// 删除最大键
// 最大键就在右子树直到null，删除就是返回左链接
function deleteMax(x) {
    if(x === null) return null;
    if(x.right === null) return x.left;
    x.right = deleteMax(x.right);
    x.N = size(x.left) + size(x.right) + 1;
    return x;
}

// 删除某个键key
/**
 * 1. 将指向即将被删除的结点的链接保存为t
 * 2. 将x指向它的后继结点min(x.right)
 * 3. 将x的右链接指向deleteMix(x.right)
 * 4. 将x的左连接（本来为空）设为t.left
 */
function deleteKey(x, key) {
    if(x === null) return null;
    if(key < x.key) x.left = deleteKey(x.left, key);
    else if(key > x.key) x.right = deleteKey(x.right, key);
    else {
        if(x.left === null) return x.right;
        if(x.right === null) return x.left;
        const t = x;
        x = min(x.right);
        x.right = deleteMin(x.right);
        x.left = t.left;
    }
    return x;
}

// 中序遍历  按顺序打印二叉查找树的所有键
// 左 根 右
function print(x) {
    if(x === null) return null;
    print(x.left);
    console.log(x.key);
    print(x.right);
}

// 范围查找
function keys(x, low, high) {
    let queue = [];
    keysQueue(x, queue, low, high);
    return queue;
}

function keysQueue(x, queue, low, high) {
    if(x === null) return null;
    if(low < x.key) keysQueue(x.left, queue, low, high);
    if(low <= x.key && x.key <= high) queue.push(x.key);
    if(x.key < high) keysQueue(x.right, queue, low, high);
}

let x; 
x = put(null, 0, 'a');
x = put(x, 1, 'b');
x = put(x, 2, 'c');
x = put(x, 3, 'd');
x = put(x, 4, 'e');
x = put(x, 5, 'f');
x = put(x, 6, 'g');
x = put(x, 7, 'h');
x = put(x, 8, 'i');

const res = get(x, 4);
console.log(res);
x = deleteKey(x, 2);
const res1 = get(x, 3);
console.log(res1);

print(x);
const queue = keys(x, 1, 6);
console.log(queue);