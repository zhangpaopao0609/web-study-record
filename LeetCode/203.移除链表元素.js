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
const removeElements = (head, val) => {
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
// @lc code=end

