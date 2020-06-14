// 数组去重
// includes 实现
let arr = [1, 1, '1', '1'];

function unique(arr) {
  let res = [];
  arr.forEach(item => {
    if (!res.includes(item)) {
      res.push(item);
    }
  })
  return res;
}

console.log(unique(arr));
