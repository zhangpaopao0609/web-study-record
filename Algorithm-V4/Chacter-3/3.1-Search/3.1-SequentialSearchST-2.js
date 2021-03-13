// 基于无序链表实现 get, put, delete, size
function LinkNode(key, val, next) {
  this.key = key;
  this.val = val;
  this.next = next;
};

class SequentialSearchST {
  constructor() {
    this.head = null;
    this.N = 0;
  }

  get(key) {
    for(let x = this.head; x != null; x = x.next) {
      if(x.key === key) {
        return x.val;
      }
    }
    return null;
  }

  put(key, val) {
    for(let x = this.head; x != null; x = x.next) {
      if(x.key === key) {
        x.val = val;
        return this.head;
      }
    }
    this.head = new LinkNode(key, val, this.head);
    this.N += 1;
    return this.head;
  }

  delete(key) {
    if(this.head && this.head.key === key) {
      this.head = this.head.next;
      this.N -= 1;
      return this.head;
    };
    for(let x = this.head; x.next != null; x = x.next) {
      if(x.next.key === key) {
        x.next = x.next.next;
        this.N -= 1;
        return this.head;
      }
    };
    throw Error(`there is no such key:${key}`);
  }

  size() { return this.N }
};

const link = new SequentialSearchST();
console.log(link.put(1, 'a'));
console.log(link.put(2, 'b'));
console.log(link.put(3, 'c'));
console.log(link.get(3));
// console.log(link.delete(3));
// console.log(link.delete(2));
console.log(link.delete(4));
console.log(link.size());
