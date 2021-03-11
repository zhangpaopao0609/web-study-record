// 栈 先进后出  头进头出
function linkNode(val, next) {
  this.val = val;
  this.next = next;
};

// 实现 unshift 和 shift 
class Stack {
  constructor() {
    this.first = null;
    this.N = 0;
  };

  isEmpty() {
    return this.N === 0;
  }

  size() {
    return this.N;
  }

  unshift(val) {
    const oldFirst = this.first;
    this.first = new linkNode(val, oldFirst);
    this.N++;
  }

  shift() {
    const oldFirst = this.first;
    this.first = this.first.next;
    return oldFirst.val;
  }
}