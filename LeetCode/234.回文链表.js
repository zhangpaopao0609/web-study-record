/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
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
 * @return {boolean}
 */
// 将链表复制到数组列表中 O(n)
// 然后使用双指针来判断回文 O(n)
const isPalindrome = head => {
  if(!head || !head.next) return true;
  const q = [];
  
};
// @lc code=end

// 将链表复制到数组列表中 O(n)
// 然后使用双指针来判断回文 O(n)
const isPalindrome_1 = head => {
  if(!head || !head.next) return true;
  const q = [];
  while(head) {
    q.push(head.val);
    head = head.next;
  };

  let start = 0;
  let end = q.length - 1;
  while(start < end) {
    if(q[start++] !== q[end--]) return false;
  };
  return true;  
};
