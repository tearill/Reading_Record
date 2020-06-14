// 数组去重
// 双指针实现
// 快指针不停向后走，和慢指针位置的值判断是否相等
// 遇到不重复元素的时候停止，使用 splice(start, count) 删除中间重复的元素
let arr = [1, 1, '1', '1'];

function unique(arr) {
  let len = arr.length;
  let slowP = 0;
  for (let fastP = 0; fastP < len; fastP++) {
    if (arr[slowP] !== arr[fastP]) { // 不重复的时候停下
      slowP++;
      arr.splice(slowP, fastP - slowP); // 删除中间重复的元素
    }
  }
  return arr;
}

console.log(unique(arr));
