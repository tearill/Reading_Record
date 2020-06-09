// ['1', '2', '3'].map(parseInt) what & why ?  
// 结果：[1, NaN, NaN]
// map(item, index, arr)
// parseInt()
// 参数：(要转换的数，进制)

console.log(['1', '2', '3'].map(parseInt)); // [1, NaN, NaN]

// 上面的代码等价于
// parseInt('1', 0) // 1
// parseInt('2', 1) // NaN
// parseInt('3', 2) // NaN

// 解决方案
// 1
console.log(['1', '2', '3'].map(Number));

// 2
// 根本原因，parseInt 在调用的时候自动使用了两个参数
// 编写一个函数，使被包裹的函数只使用一个参数
const wrapper = fn => val => fn(val);
let parse = wrapper(parseInt);
console.log(['1', '2', '3'].map(parse));
