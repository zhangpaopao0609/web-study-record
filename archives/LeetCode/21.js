// 21. 合并两个有序链表
// 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
 

// 示例：

// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4

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
var mergeTwoLists = function(l1, l2) {
    const L1 = l1.split('->');
    const L2 = l2.split('->');
    let res = [];
    while (L1.length && L2.length) {
      if(Number(L1[0]) < Number(L2[0])) {
        res.push(L1[0]);
        L1.shift();
      } else {
        res.push(L2[0]);
        L2.shift();
      }
    }
    return res.concat(L1).concat(L2).join('->');
};

console.log(mergeTwoLists('1->2->4', '1->3->4'));




// var mergeTwoLists = function(l1, l2) {
//   if (l1 === null) {
//       return l2;
//   } else if (l2 === null) {
//       return l1;
//   } else if (l1.val < l2.val) {
//       l1.next = mergeTwoLists(l1.next, l2);
//       return l1;
//   } else {
//       l2.next = mergeTwoLists(l1, l2.next);
//       return l2;
//   }
// };