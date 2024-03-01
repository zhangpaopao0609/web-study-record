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
const deleteDuplicates = head => {
  let current = head;
  while(current !== null && current.next !== null) {
    if(current.val === current.next.val ) {
      current.next = current.next.next;
    }else {
      current = current.next;
    }
  }
  return head;
};
// @lc code=end


// 以为自己很完美了，其实还差了些
function ListNode(val) {
  this.val = val;
  this.next = null;
}
const deleteDuplicates_1 = head => {
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

