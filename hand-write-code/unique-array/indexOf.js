// 数组去重
// indexOf
let arr = [1, 1, '1', '1'];

function unique(arr) {
  let res = [], len = arr.length;
  for (let i = 0; i < len; i++) {
    if (res.indexOf(arr[i]) === -1) { // res 中不存在这个元素的时候再添加
      res.push(arr[i]);
    }
  }
  return res;
}

console.log(unique(arr));
