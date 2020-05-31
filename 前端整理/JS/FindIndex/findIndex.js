// 实现 findIndex，查找符合要求的元素下标

/**
 * @param {*} array 要操作的数组
 * @param {*} predicate 查找条件函数
 * @param {*} context 函数运行上下文
 * @returns 找到了就返回符合要求的元素的下标，未找到返回 -1
 */

function findIndex(array, predicate, context) {
  for (let i = 0; i < array.length; i++) {
    if (predicate.call(context, array[i], i, array)) return i;
  }
  return -1;
}

console.log(findIndex([1, 2, 3, 4], function(item, index, array) {
  if (item === 3) return true;
}, [1, 2, 3, 4])) // 2
