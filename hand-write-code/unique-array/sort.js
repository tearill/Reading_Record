// 数组去重
// sort 实现
// 排序后去重, 只需要比较前后元素是否相同
let arr = [1, 1, '1', '1'];

function unique(arr) {
  let res = [];
  let sortedArr = arr.sort();
  for (let i = 0; i < sortedArr.length; i++) {
    if (sortedArr[i] !== sortedArr[i + 1]) {
      res.push(sortedArr[i]);
    }
  }
  return res;
}

console.log(unique(arr));
