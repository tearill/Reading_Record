# JS 中异步编程方案  
## 回调函数  
处理完回来在合适的时机执行函数  
- 回调函数的问题  
  1. 线性理解能力缺失，回调地狱  
    假如多个操作存在依赖性，很容易过度嵌套，造成回调地狱，难以追踪回调的执行顺序  
  2. 每个任务只能指定一个回调  
  3. 错误处理无法保证  
    回调函数无法使用 try ... catch 捕获错误  
    可能出现的错误包括：回调返回错误结果、吞掉可能出现的错误与异常、回调没有执行、回调被多次执行、回调被同步执行等等  

## 事件监听  
事件监听下异步任务的执行不取决于代码的顺序，而取决于某个事件是否发生  
例如：当 f1 结束后执行 f2(f1 触发 end 事件)  
`f1.on('done', f2);`  
- 事件监听的缺点  
  每个事件可以指定多个回调函数，但是整个程序要变成事件驱动型，运行流程会变得不清晰，阅读代码的时候很难看出主流程  

## 发布订阅  
存在一个信号中心，当某个任务完成之后，向信号中心发布(publish)信号，其他任务可以向信号信号中心订阅(subscribe)信号，所以可以知道什么时候该执行  
应用：Vue 的响应式更新  

## Promise  
构造 Promise 的时候，构造函数内部的代码是立即执行的  
Promise 不是对回调的替代。 Promise 在回调代码和将要执行这个任务的异步代码之间提供了一种可靠的中间机制来管理回调  
Promise 就是一个容器，保存着某个未来才会结束的事件(通常是异步事件)的结果
- Promise 解决回调地狱的手段  
  1. 回调函数延迟绑定  
  2. 返回值穿透  
  3. 错误冒泡  

- Promise 的方法  
  1. Promise.all() => 返回 Promise  
    传入 Promise 数组，只有传入的所有 Promise 都变成 fullfilled，返回的 Promise 才会变成 fullfilled，如果有一个 Promise 被 reject，p 的状态就变成 rejected  
  2. Promise.race()  
    传入 Promise 数组，返回第一个有结果的 Promise，无论是 resolve 还是 reject，返回最快的  
  3. Promise.reject()  
  4. Promise.resolve()  
  5. Promise.prototype.finally()  
  6. Promise.allSettled() => ES2020 引入，等到数组所有的 Promise 都返回结果，不管是 fullfilled 还是 rejected，该方法返回的新的 Promise 实例，一旦结束，状态总是 fulfilled，不会变成 rejected  
  7. Promice.any()  
    只要参数实例有一个变成 fullfilled，包装实例就会变成 fulfilled，如果所有参数实例都变成 rejected，包装实例就会变成 rejected  
    Promise.any() 和 Promise.race() 有一点不同就是不会因为某个 Promise 变成 rejected 而结束  

- Promise 的特点  
  1. 对象的状态不受外界影响，Promise 对象代表异步操作，有三个状态：pending、fullfilled、rejected  
    只有异步操作结果才可以决定当前的状态，其他操作都无法改变状态  
  2. 一旦状态改变了就不会再变，任何时候都可以得到这个结果  
    **Promise 对象的状态改变只有两种**：pending => fullfilled || pending => rejected  

- Promise 的缺点  
  1. 一旦新建就会立即执行，无法中途取消  
  2. 如果不设置回调函数，Promise内部抛出的错误，不会反应到外部  
  3. 当处于 pending 状态的时候，无法得知目前进展到哪一个阶段(刚开始还是即将完成)  

## Generator  
可暂停函数, yield 可暂停，next 方法可启动，每次返回的是 yield 后的表达式结果  
**yield 表达式本身没有返回值，或者说总是返回 undefined**  
**next 方法可以携带一个参数，这个参数会被当作上一个 yield 表达式的返回值**  
举例：
```js
function* foo(x) {
  let y = 2 * (yield(x + 1));
  let z = yield(y / 3);
  return (x + y + z);
}
let it = foo(5);
console.log(it.next()); // { value: 6, done: false }
console.log(it.next(12)); // { value: 8, done: false }
console.log(it.next(13)); // { value: 42, done: true }
```
分析：  
1. let it = foo(5)  
2. 第一次调用 it.next() 函数停在第一个 yield(x + 1)，所以返回值为 5 + 1 = 6  
3. 第二次调用 it.next(12)，next 中的参数 12 被当作上一个 yield 的返回值，所以 y = 2 * 12 = 24，函数会停在第二个 yield(y / 2)，返回值为 24 / 3 = 8  
4. 第三次调用 it.next(13)，next 中的参数 13 被当作上一个 yield 的返回值，**此时 x = 5, y = 24, z = 13**  
5. 最后 return(x + y + z)，结果为 5 + 24 + 13 = 42  

## Async/Await  
- async 函数相对于 generator 的改进  
  1. 内置执行器  
    可以自动执行，不需要使用 next()  
  2. 语义更好  
  3. 更好的适用性  
     co 函数库约定，yield 命令后面只能是 Thunk 函数或 Promise 对象，而 async 函数的 await 命令后面，可以跟 Promise 对象和原始类型的值（数值、字符串和布尔值，但这时等同于同步操作）  
  4. 返回值是 Promise  
    可以用 then 方法指定下一步的操作  
**进一步说，async 函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖**  
**每次使用 await, 解释器都创建一个 promise 对象，然后把剩下的 async 函数中的操作放到 then 回调函数中**  

- async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里  

- async 与 Promise、Generator 的比较  
  假定某个 DOM 元素上面，部署了一系列的动画，前一个动画结束，才能开始后一个。如果当中有一个动画出错，就不再往下执行，返回上一个成功执行的动画的返回值。  
  - Promise 版本  
  ```js
  function chainAnimationsPromise(elem, animations) {
    // 变量ret用来保存上一个动画的返回值
    let ret = null;

    // 新建一个空的Promise
    let p = Promise.resolve();

    // 使用then方法，添加所有动画
    for(let anim of animations) {
      p = p.then(function(val) {
        ret = val;
        return anim(elem);
      });
    }

    // 返回一个部署了错误捕捉机制的Promise
    return p.catch(function(e) {
      /* 忽略错误，继续执行 */
    }).then(function() {
      return ret;
    });
  }
  ```
  语义不清晰  
  - Generator 版本  
  ```js
  function chainAnimationsGenerator(elem, animations) {
    return spawn(function*() {
      let ret = null;
      try {
        for(let anim of animations) {
          ret = yield anim(elem);
        }
      } catch(e) {
        /* 忽略错误，继续执行 */
      }
      return ret;
    });
  }
  ```
  需要一个任务执行器 spawn 函数，且必须保证 yield 后面的表达式必须返回一个 Promise  
  - Async 版本  
  ```js
  async function chainAnimationsAsync(elem, animations) {
    let ret = null;
    try {
      for(let anim of animations) {
        ret = await anim(elem);
      }
    } catch(e) {
      /* 忽略错误，继续执行 */
    }
    return ret;
  }
  ```
  对 generator 的封装，不需要自己写执行器函数  