/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 * 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
// 利用哨兵模式
const removeElements = (head, val) => {
  const sentinel = new ListNode(0);
  sentinel.next = head;

  let prev = sentinel, curr = head;
  while(curr) {
    if(curr.val === val) {
      prev.next = curr.next;
    }else {
      prev = curr;
    }
    curr = curr.next;
  }
  return sentinel.next;
};
// @lc code=end

// 指针这种地址引用实在是太神奇了
const removeElements_1 = (head, val) => {
  while(head && head.val === val) {
    head = head.next; 
  }
  let l = head;
  while(l && l.next) {
    if(l.next.val === val) {
      l.next = l.next.next;
    }else {
      l = l.next;
    }
  }
  return head;
};
// 65/65 cases passed (88 ms)
// Your runtime beats 99.44 % of javascript submissions
// Your memory usage beats 36.17 % of javascript submissions (42.6 MB)


// 利用哨兵模式
const removeElements_2 = (head, val) => {
  const sentinel = new ListNode(0);
  sentinel.next = head;

  let prev = sentinel, curr = head;
  while(curr) {
    if(curr.val === val) {
      prev.next = curr.next;
    }else {
      prev = curr;
    }
    curr = curr.next;
  }
  return sentinel.next;
};
