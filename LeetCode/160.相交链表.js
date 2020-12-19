/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表 
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 神奇的双指针

const getIntersectionNode = (headA, headB) => {
  if(!headA && !headB) return null;
  let pA = headA;
  let pB = headB;

  while(pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
};
// @lc code=end

const getIntersectionNode_1 = (A, B) => {
  const hashMap = new Map();
  while(A) {
    hashMap.set(A);
    A = A.next;
  }
  while(B) {
    if(hashMap.has(B)) return B;
    B = B.next;
  }
  return null;
};

