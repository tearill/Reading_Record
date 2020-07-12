function say(a, b, c, d) {
  console.log('say', a, b, c, d);
}

// 扩展方法
// 当前实例都可以调用所属类原型上的方法
// this 指向 谁调用 this 就指向谁
Function.prototype.before = function(callback) {
  return (...args) => { // newSay 箭头函数没有 this, 没有 arguments, 没有 prototype, 不能 new
    callback();
    this(...args); 
  }
}

let newSay = say.before(() => {
  console.log('before say');
})

newSay(1, 2, 3, 4);
