/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
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
 * @return {ListNode}
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
const deleteDuplicates = head => {
  const prehead = new ListNode(-Infinity);
  let prev = prehead;

  while(head !== null) {
    if(prev.val !== head.val) {
      prev.next = new ListNode(head.val);
      prev = prev.next;
    }
    head = head.next;
  }
  return prehead.next;
};
// @lc code=end

