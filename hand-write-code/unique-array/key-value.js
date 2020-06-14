// 数组去重
// key-value 实现, Object 键值对
// 使用一个空的对象，把数组的值存成对象的 key，后续元素判断 key 是否存在
let arr = [1, 1, '1', '1'];

function unique(arr) {
  let obj = {};
  return arr.filter(item => { // item + item 避免把 1 和 '1' 判断成同一个值
    return obj.hasOwnProperty(typeof item + item) ? false : (obj[typeof item + item] = true);
  })
}

console.log(unique(arr));
