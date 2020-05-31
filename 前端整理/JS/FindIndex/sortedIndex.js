// 实现 sortedIndex
// 在一个排好序的数组中找到 value 的位置。保证插入数组后，依然保持有序状态

// 版本一
// 二分查找
// 无法处理数组的每一个元素
function sortedIndex_first(arr, obj) {
  let low = 0, high = arr.length;
  while(low < high) {
    let mid = (low + high + 1) >> 1;
    if (arr[mid] < obj) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return high;
}

console.log(sortedIndex_first([10, 20, 30], 25)); // 2


// 版本二
// 加入 iteratee 函数对数组每一个元素进行操作
// 涉及 this 指向问题
function cb(fn, context) {
  return function(obj) {
    return fn ? fn.call(context, obj) : obj;
  }
}

function sortedIndex_secone(arr, obj, iteratee, context) {
  iteratee = cb(iteratee, context);
  let low = 0, high = arr.length;
  while(low < high) {
    let mid = Math.floor((low + high) / 2);
    if (iteratee(arr[mid]) < iteratee(obj)) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return high;
}

let stooges = [{name: 'stooge1', age: 10}, {name: 'stooge2', age: 30}];
let result = sortedIndex_secone(stooges, {name: 'stooge3', age: 20}, function(stooge) {
  return stooge.age;
}, stooges);
console.log(result);
