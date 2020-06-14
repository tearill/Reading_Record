// 数组去重
// 双重 for 循环，使用一个新数组保存去重后的数组
let arr = [1, 1, '1', '1'];

function unique(arr) {
  let res = [], arrLen = arr.length;
  for (var i = 0; i < arrLen; i++) {
    for (var j = 0, resLen = res.length; j < resLen; j++) { // resLen 动态变化
      if (arr[i] === res[j]) break;
    }
    if (j === resLen) { // 如果 arr[i] 是唯一的，循环出来的 j 就是最后一项
      res.push(arr[i]);
    }
  }
  return res;
}

console.log(unique(arr));
