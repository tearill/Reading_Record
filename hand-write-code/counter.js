// 实现一个 counter 函数完成输出

function counter(v) {
  let count = v;
  return {
    add() {
      return ++count;
    },
    sub() {
      return --count;
    }
  }
}
const c = counter(3)
console.log(c.add()) // 4
console.log(c.sub()) // 3
c.add()
console.log(c.add()) // 5
