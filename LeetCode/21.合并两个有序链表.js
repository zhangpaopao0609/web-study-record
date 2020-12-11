/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */ 
function ListNode(val, next) {
  this.val = val===undefined ? 0 : val;
  this.next = next===undefined ? null : next; 
}

const mergeTwoLists = function(l1, l2) {
  let first = null;
  while(l1 !== null && l2 !== null) {
    if(l1.val < l2.val) {
      first = new ListNode(l1.val, first)
      l1 = l1.next;
    }else {
      first = new ListNode(l2.val, first)
      l2 = l2.next;
    }
  };
  while(l1 !== null) {
    first = new ListNode(l1.val, first)
    l1 = l1.next;
  };
  while(l2 !== null) {
    first = new ListNode(l2.val, first)
    l2 = l2.next;
  };
  let new_first = null;
  while(first !== null) {
    new_first = new ListNode(first.val, new_first);
    first = first.next;
  }
  return new_first;
};


// @lc code=end

