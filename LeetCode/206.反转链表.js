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
const reverseList = head => {
  
}
// @lc code=end

// 迭代
const reverseList = head => {
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

