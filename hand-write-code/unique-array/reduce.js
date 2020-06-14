// 数组去重
// reduce 实现
let arr = [1, 1, '1', '1'];

function unique(arr) {
  return arr.sort().reduce((acc, cur) => { // 每一项加进去的时候都要判断
    if (acc.length === 0 || acc[acc.length - 1] !== cur) { // 当前元素和结果的最后一个元素
      acc.push(cur);
    }
    return acc;
  }, []);
}

console.log(unique(arr));
