// 数组去重
// Map 实现
let arr = [1, 1, '1', '1'];

function unique(arr) {
  let map = new Map();
  return arr.filter(item => !map.has(item) && map.set(item, 1)); // map 中不存在才往里放
}

console.log(unique(arr));
