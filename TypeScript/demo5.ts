// 函数声明法
function add(n1: number, n2: number): number {
  return n1 + n2
}
console.log(add(1, 2))

// 函数表达式法 -> 声明了必须使用，不然会报错
var add2 = function(n1: number, n2: number) {
  return n1 + n2
}
console.log(add2(1, 2))

// 箭头函数 完全支持 ES6
var add3 = (n1: number, n2: number): number => {
  return n1 + n2
}
console.log(add3(2, 2))