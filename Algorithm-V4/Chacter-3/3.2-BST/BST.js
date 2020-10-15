class Node {    // 定义节点类
    constructor(key, val, N) {
        this.key = key;
        this.val = val;
        this.N = N;
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

const x = put(null, 0, 'a')
const res = get(x, 0);
console.log(res);