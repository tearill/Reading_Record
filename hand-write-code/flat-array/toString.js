// 数组去重
// toString 实现 => 只适用于数组元素全部是数字的情况
let arr = [1, [2, [3, 4]]];

const wrapper = fn => val => fn(val); // 只使用一个参数

function flatten(arr) {
  // return arr.toString().split(',').map(Number);
  // split 成数组之后把每一项转换为数字
  return arr.toString().split(',').map(wrapper(parseInt));
}

console.log(flatten(arr));
