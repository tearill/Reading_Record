// indexOf 和 lastIndexOf 可以传第二个参数 fromIndex 表示搜索的起始位置
// indexOf
// 开始查找的位置。如果该索引值大于或等于数组长度，意味着不会在数组里查找，返回-1。
// 如果参数中提供的索引值是一个负值，则将其作为数组末尾的一个抵消，
// 即-1表示从最后一个元素开始查找，-2表示从倒数第二个元素开始查找 ，以此类推。 
// 注意：如果参数中提供的索引值是一个负值，并不改变其查找顺序，查找顺序仍然是从前向后查询数组。
// 如果抵消后的索引值仍小于0，则整个数组都将会被查询。其默认值为0.

// lastIndexOf
// 从此位置开始逆向查找。默认为数组的长度减 1(arr.length - 1)，即整个数组都被查找。
// 如果该值大于或等于数组的长度，则整个数组会被查找。如果为负值，将其视为从数组末尾向前的偏移。
// 即使该值为负，数组仍然会被从后向前查找。
// 如果该值为负时，其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。

function createIndexOfFinder(direction) {
  return function(arr, item, idx) {
    let len = arr.length;
    let i = 0;
    if (typeof idx == 'number') {
      if (direction > 0) {
        i = idx >= 0 ? idx : Math.max(len + idx, 0);
      } else {
        len = idx > 0 ? Math.min(idx + 1, len) : idx + len + 1;
      }
    }

    for (idx = direction > 0 ? i : len - 1; idx >= 0 && idx < len; idx += direction) {
      if (arr[idx] === item) return idx;
    }

    return -1;
  }
}

let indexOf = createIndexOfFinder(1);
let lastIndexOf = createIndexOfFinder(-1);

console.log(indexOf([1, 2, 3, 4], 3, 3));
console.log(lastIndexOf([1, 2, 3, 4], 3, 3));
