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
// 反转后半部分链表，然后将前半部分和后半部分进行比较。比较完成后应该将链表恢复原样。虽然不需要恢复也能通过测试用例，但是使用该函数的人通常不希望链表结构被更改

// 通过快慢指针得到链表的后半部分
const findTheSecondHalf = link => {
  let slow = link;
  let fast = link;
  while(fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  };
  return slow;
}

const reverseLink = link => {
  let prev = null;
  let curr = link;
  while(curr) {
    const temp = curr.next;
    curr.next= prev;
    prev = curr;
    curr = temp;
  }
  return prev;
}

const isPalindrome = head => {
  if(!head || !head.next) return true;

  // 找到前半部分和后半部分
  const secondHalf = findTheSecondHalf(head);
  const reverseSecondHalf = reverseLink(secondHalf.next);

  // 判断是否回文,以后半部分为基准
  let firstHalf = head;
  let reverseSecondHalfClone = reverseSecondHalf;
  let flag = true;
  while(reverseSecondHalfClone) {
    if(firstHalf.val !== reverseSecondHalfClone.val) {
      flag = false;
      break;
    };
    firstHalf = firstHalf.next;
    reverseSecondHalfClone = reverseSecondHalfClone.next;
  };
  // 将后半部分翻转回来
  secondHalf.next = reverseLink(reverseSecondHalf);
  return flag;
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

// ---------------------------------------------
// 递归
let frontPointer;

const recursivelyCheck = currentNode => {
  if(currentNode !== null) {
    if(!recursivelyCheck(currentNode.next)) {
      return false;
    };
    if(currentNode.val !== frontPointer.val) {
      return false;
    }
    frontPointer= frontPointer.next;
  };
  return true;
};

const isPalindrome_2 = head => {
  if(!head || !head.next) return true;
  frontPointer = head;
  return recursivelyCheck(head);  
};



// 反转后半部分链表，然后将前半部分和后半部分进行比较。比较完成后应该将链表恢复原样。虽然不需要恢复也能通过测试用例，但是使用该函数的人通常不希望链表结构被更改
// 
const isPalindrome_3 = head => {
  if(!head || !head.next) return true;
  let slow = head;
  let fast = head;

  while(fast.next && fast.next.next) {
    fast = fast.next.next;
    slow = slow.next;
  };

  let prev = null;
  let curr = slow.next; 
  while(curr) {
    const temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  };
  let front = head;
  while(prev) {
    if(prev.val !== front.val) return false;
    prev = prev.next;
    front = front.next;
  }
  
  return true;
};