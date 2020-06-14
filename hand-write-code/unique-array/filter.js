// 数组去重
// 使用 filter 实现
let arr = [1, 1, '1', '1'];

function unique(arr) {
  return arr.filter((item, index, arr) => {
    return arr.indexOf(item) === index; // 过滤出下标查找正确的
  })
}

console.log(unique(arr));
