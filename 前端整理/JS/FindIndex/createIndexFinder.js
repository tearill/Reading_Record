// createIndexFinder
// 在一个函数/循环中同时实现 findIndex 和 findLastIndex 的功能

function createIndexFinder(direction) {
  return function(array, predicate, context) {
    let len = array.length;
    let index = direction > 0 ? 0 : len - 1; // 循环的开始位置

    for (; index >= 0 && index < len; index += direction) {
      if (predicate.call(context, array[index], index, array)) return index;
    }

    return -1;
  }
}

let findIndex = createIndexFinder(1);
let findLastIndex = createIndexFinder(-1);

console.log(findIndex([1, 2, 3, 4], function(item, index, array) {
  if (item === 3) return true;
}, [1, 2, 3, 4]))

console.log(findLastIndex([1, 2, 3, 4, 2], function(item, index, array) {
  if (item === 2) return true;
}, [1, 2, 3, 4]))
