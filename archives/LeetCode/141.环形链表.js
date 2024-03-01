/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 *
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
// https://leetcode-cn.com/problems/linked-list-cycle/solution/yi-wen-gao-ding-chang-jian-de-lian-biao-wen-ti-h-2/
// 这就很神奇了
// 龟兔赛跑，如果没有环，兔子就到链表末尾了
// 如果有环，兔子会一直在环里跑，乌龟慢慢进入环，兔子和乌龟一定会重合
// 就像在操场跑步一样，一快一慢，肯定会有重合的那一天
const hasCycle = head => {
  if(!head || !head.next) return false;
  let tortoise = head;
  let rabbit = head.next;

  while(tortoise !== rabbit) {
    if(!rabbit || !rabbit.next) return false;
    rabbit = rabbit.next.next;
    tortoise = tortoise.next;
  };
  return true;
};
// @lc code=end

// 这里的思路是
// 将链表遍历的节点记录下来，然后查看下一个节点是否是之前出现过的
// 这样做空间 O(n2) 时间O(n2)
const hasCycle_1 = head => {
  if(!head) return false;
  if(!head.next) return false;
  const nodeArr = [];
  while(head) {
    for (let i = nodeArr.length-1; i >= 0 ; i--) {
      if(nodeArr[i] === head) {
        return true;
      }
    }
    nodeArr.push(head);
    head = head.next;
  }
  return false;
};


const hasCycle_2 = head => {
  const headMap = new Map();
  while(head) {
    if(headMap.has(head)) return true;
    headMap.set(head);
    head = head.next;
  }
  return false;
};
