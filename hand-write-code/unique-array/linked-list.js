// 数组去重
// 链表实现
function ListNode(val) {
  this.val = val;
  this.next = null;
}

const n1 = new ListNode(1);
const n2 = new ListNode(2);
const n3 = new ListNode(3);
const n4 = new ListNode(3);
const n5 = new ListNode(4);
const n6 = new ListNode(4);
n1.next = n2;
n2.next = n3;
n3.next = n4;
n4.next = n5;
n5.next = n6;

console.log(n1, '-----origin');

function unique(head) {
  if (head == null || !head.next) return head;
  let cur = head;
  while(cur.next) {
    if (cur.val === cur.next.val) {
      cur.next = cur.next.next; // 相同的话就跳过并且往后指
    } else {
      cur = cur.next;
    }
  }
  return head;
}

console.log(unique(n1));
console.log(unique(n1.next));
