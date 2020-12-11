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
  const prehead = new ListNode(-1);

  // 其实我想过的，但我为什么没有把写出来呢，因为我没想到如何保存这个链表结构，其实很简单，就是利用引用的原理，保留了一个prehead
  let prev = prehead;
  while(l1 !== null && l2 !== null) {
    if(l1.val < l2.val) {
      prev.next = l1;
      l1 = l1.next;
    }else {
      prev.next = l2;
      l2 = l2.next;
    }
    prev = prev.next;
  }

  if(l1 === null) {
    prev.next = l2;
  }else {
    prev.next = l1;
  }

  return prehead.next;
};


// @lc code=end

// 这是我自己的解法，两个链表
function ListNode(val, next) {
  this.val = val===undefined ? 0 : val;
  this.next = next===undefined ? null : next; 
}

const mergeTwoLists_1 = function(l1, l2) {
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


// 递归
// 思想很棒呀
const mergeTwoLists_2 = function(l1, l2) {
  if(l1 === null) {
    return l2;
  }else if(l2 === null) {
    return l1;
  }else if(l1.val < l2.val) {
    l1.next = mergeTwoLists_2(l1.next, l2);
    return l1;
  }else {
    l2.next = mergeTwoLists_2(l1, l2.next);
    return l2;
  }
};
