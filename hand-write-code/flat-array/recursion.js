// 数组展平
// 递归实现
let arr = [1, [2, [3, 4]]];

function flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    if (Array.isArray(cur)) { // 递归展平
      result = result.concat(flatten(cur));
    } else {
      result.push(cur);
    }
  }
  return result;
}

console.log(flatten(arr));
