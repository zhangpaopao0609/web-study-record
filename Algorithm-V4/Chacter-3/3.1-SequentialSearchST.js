// SequentialSearchST
// 顺序查找， 基于无序链表
let first; // 链表首节点

class Node { // 链表节点
    constructor(key, value, next) {
        this.key = key; // 键
        this.value = value; // 值
        this.next = next; // 下个节点
    }
}

first = new Node(null, null, null);
// first = null;

function get(key) { // 遍历链表，如果key和某个节点的key相同就返回节点的值
    for(let x = first; x.next != null; x = x.next) {
        if(euqals(key, x.key)) {
            return x.value;
        }
    }
    return null;
}

function put(key, value) {
    for(let x = first; x.next != null; x = x.next) {
        if(euqals(key, x.key)) {
            x.value = value;
            return;
        }
    }
    first = new Node(key, value, first);
}

function euqals(a, b) {
    return a === b;
}

function size() {
    let count = 0;
    for(let x = first; x.next != null; x = x.next) {
        count++;
    }
    return count;
}

function keys() {
    let keys = [];
    for(let x = first; x.next != null; x = x.next) {
        keys.push(x.key)
    }
    return keys;
}

function deleteNode(key) {
    if(euqals(first.key, key)) {
        first = first.next;
    }
    for(let x = first; x.next != null; x = x.next) {
        if(euqals(key, x.next.key)) {
            x.next = x.next.next;
            return;
        }
    }
    throw Error('there is no this key');
}

put('test', 3);
put('try', 3);
const get1 = get('try');
console.log(get1);
const count = size();
console.log(count);
const keys1 = keys();
console.log(keys1);
const del = deleteNode('test');
console.log(del);

const count2 = size();
console.log(count2);
const keys2 = keys();
console.log(keys2);



