// async iterator
let obj = {
  a: 1,
  b: 2,
  // 异步的
  [Symbol.asyncIterator]: function () { // 元编程
    // this === obj
    let keys = Object.keys(this); // 当前对象上的所有 key
    return {
      next: () => {
        // for of 每循环一次，调用一次 next
        let key = keys.shift(); // 弹出一个 key
        let value = this[key]; // 拿到 value
        // return {
        //   done: key === undefined,
        //   value: [key, value]
        // }
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({
              done: key === undefined,
              value: [key, value]
            })
          }, 3000);
        })
        // return Promise.resolve({
        //   done: key === undefined,
        //   value: [key, value]
        // })
      }
    }
  }
}

// 异步的必须用 for await
async function foo() {
  for await (let val of obj) {
    // ['a', 1]
    // ['b', 2]
    console.log(val); // 正常会报错
  }
}

foo();
