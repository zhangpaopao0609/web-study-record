/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表 
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
 * @return {ListNode}
 */
// 递归
const reverseList = head => {
  if(!head || !head.next) return head;
  const p = reverseList(head.next);
  head.next.next = head;
  head.next =null;
  return p;
};
// @lc code=end

// 迭代
const reverseList_1 = head => {
  let reverse = null;
  while(head) {
    const temp = new ListNode(head.val);
    temp.next = reverse;
    reverse = temp;
    head = head.next;
  }
  return reverse;
};
// Accepted
// 27/27 cases passed (76 ms)
// Your runtime beats 98.12 % of javascript submissions
// Your memory usage beats 86.8 % of javascript submissions (39.2 MB)

// 迭代二
const reverseList_2 = head => {
  let rev = null;
  let curr = head;
  while(curr) {
    const temp = curr.next;
    curr.next = rev;
    rev = curr;
    curr = temp;
  }
  return rev;
};
