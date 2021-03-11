// 队列 先进先出  尾进头出
function linkNode(val, next) {
  this.val = val;
  this.next = next;
};

// 实现 push 和 shift 
class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.N = 0;
  };

  isEmpty() {
    return this.N === 0;
  }

  size() {
    return this.N;
  }

  push(val) {
    const oldLast = this.last;
    this.last = new linkNode(val, null);
    if(this.isEmpty()) {
      this.first = this.last;
    }else {
      oldLast.next = this.last;
    }
    this.N++;
  }

  shift() {
    const oldFirst = this.first;
    this.first = this.first.next;
    if(this.isEmpty()) this.last = null;
    this.N--;
    return oldFirst.val;
  }
}