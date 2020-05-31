// 一个函数实现 indexOf 和 lastIndexOf

function createIndexOfFinder(direction) {
  return function(arr, item) {
    let len = arr.length;
    let index = direction > 0 ? 0 : len - 1; // 循环开始（控制循环方向）

    for (; index >= 0 && index < len; index += direction) {
      if (arr[index] === item) return index;
    }

    return -1;
  }
}

let indexOf = createIndexOfFinder(1);
let lastIndexOf = createIndexOfFinder(-1);

console.log(indexOf([1, 2, 3, 4, 2], 2)); // 1
console.log(lastIndexOf([1, 2, 3, 4, 2], 2)); // 4
