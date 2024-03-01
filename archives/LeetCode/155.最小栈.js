/*
 * @lc app=leetcode.cn id=155 lang=javascript
 *
 * [155] 最小栈
 *
 * 
 */

// @lc code=start
/**
 * initialize your data structure here.
 */
// 辅助栈来保存当前时刻的最小值
const MinStack = function() {
  this.stack = [];
  this.min = [];
  this.min.push(Infinity);
  this.len = 0;
  return null;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  this.stack.push(x);
  this.min.push(x < this.min[this.len] ? x : this.min[this.len]);
  this.len++;
  return null;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  if(!this.len) return null;
  this.len--;
  this.min.pop();
  return this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
  if(!this.len) return null;
  return this.stack[this.len - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
  if(!this.len) return null;
  return this.min[this.len];
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
// @lc code=end



// 
const MinStack_1 = function() {
  this.stack = [];
  this.len = 0;
  return null;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack_1.prototype.push = function(x) {
  this.stack.push(x);
  this.len++;
  return null;
};

/**
 * @return {void}
 */
MinStack_1.prototype.pop = function() {
  if(!this.len) return null;
  this.len--;
  return this.stack.pop();
};

/**
 * @return {number}
 */
MinStack_1.prototype.top = function() {
  if(!this.len) return null;
  return this.stack[this.len - 1];
};

/**
 * @return {number}
 */
MinStack_1.prototype.getMin = function() {
  let min = Infinity;
  if(!this.len) return null;
  for (let i = 0; i < this.len; i++) {
    if(this.stack[i] < min) {
      min = this.stack[i];
    }
  }
  return min;
};

