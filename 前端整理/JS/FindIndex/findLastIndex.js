// 实现 findLastIndex
// 倒序查找的 findLastIndex，只需要修改循环的条件方向
// 从后往前循环

function findLastIndex(array, predicate, context) {
  let len = array.length;
  for (let i = len - 1; i >= 0; i--) {   
    if (predicate.call(context, array[i], i, array)) return i
  }
  return -1;
}

console.log(findLastIndex([1, 2, 3, 4], function(item, index, array) {
  if (item === 1) return true;
}, [1, 2, 3, 4]))

console.log(findLastIndex([1, 2, 3, 4, 2], function(item, index, array) {
  if (item === 2) return true;
}, [1, 2, 3, 4]))
