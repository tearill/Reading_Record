// 使用递归实现数组展平
let arr = [1, [2, [3, 4]]];
// let result = [];

function flatten(arr) {
  var result = [];
  for (let i = 0; i < arr.length; i++) {
    let cur = arr[i]
    if (Array.isArray(cur)) {
      // flatten(arr[i]);
      result = result.concat(flatten(cur));
    } else {
      result.push(cur);
    }
  }
  return result;
}

console.log(flatten([[1, 2, 3], [4, 5]]));
console.log(flatten(arr));
