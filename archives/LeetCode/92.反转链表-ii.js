/*
 * @lc app=leetcode.cn id=92 lang=javascript
 * 
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
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
// 反转链表
const reverseLink = function(head) {
  let curr = null;
  let prev = head;
  while(prev) {
    const next = prev.next;
    prev.next = curr;
    curr = prev;
    prev = next;
  };
  return curr;
}

// 首先获取到 leftNode 以及 rightNode
// 然后切断 leftNode 到 rightNode
// 反转， 然后 beforeLeft.next = rightNode; leftNode.next = afterRight
const reverseBetween = function(head, left, right) {
  let cloneHead = new ListNode(null, head);
  // beforeLeft 为从左往右 cloneHead 走 left-1步
  let beforeLeft = cloneHead;
  for (let i = 0; i < left - 1; i++) {
    beforeLeft = beforeLeft.next;
  };
  let leftNode = beforeLeft.next;
  let rightNode = leftNode;
  // rightNode 为从左往右 leftNode 走 right-left 步
  for (let i = 0; i < right - left; i++) {
    rightNode = rightNode.next;
  };
  afterRight = rightNode.next;
  // 切断
  beforeLeft.next = null;
  rightNode.next = null;
  // 反转 中间 链表
  reverseLink(leftNode);
  // console.log(reversed);
  beforeLeft.next = rightNode;
  leftNode.next = afterRight;
  return cloneHead.next;
};
// @lc code=end

