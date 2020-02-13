# JS 单线程  

- 浏览器是 multi-process 多进程  
  
# 浏览器端的 EventLoop  
- 一个调用栈、一个宏任务队列和一个微任务队列  
  宏任务：  
  1. script(整体的代码)
  2. setTimeout()
  3. setInterval()
  4. setImmediate() --- NodeJs 专属
  5. I/O
  6. UI 渲染 --- requestAnimationFrame

  微任务：
  1. process.nextTick
  2. Promise--- Promise.then()
  3. asynv/await --- 实际就是Promise
  4. MutationObserver(h5新特性)

- 执行顺序：  
  1. 从宏任务队列中取出队头任务执行 --- 第一轮执行 script
  2. 如果产生了宏任务，将宏任务放入宏任务队列，下次轮循的时候执行
  3. 如果产生了微任务，将微任务放入微任务队列
  4. 执行完当前宏任务之后，取出微任务队列中的所有任务依次执行
  5. 如果微任务执行过程中产生了新的微任务，则继续执行微任务，直到微任务的队列为空 
  6. 轮循，取出宏任务队列中的队头任务继续执行  

- 特殊的点:  
  async/await 函数的执行：  
  1. async 隐式返回 Promise 作为结果  
  2. 执行完 await 之后直接跳出 async 函数，让出执行的所有权
  3. 将 await 后面的代码放到微任务队列中
  4. 当前其他代码执行完之后再次获得执行权进行执行 

  举个栗子：
  ```
    console.log('script start')

    async function async1() {
        await async2()
    console.log('async1 end')
    }
    async function async2() {
        console.log('async2 end')
    }
    async1()

    setTimeout(function() {
        console.log('setTimeout')
    }, 0)

    new Promise(resolve => {
        console.log('Promise')
    resolve()
    })
    .then(function() {
        console.log('promise1')
    })
    .then(function() {
        console.log('promise2')
    })

    console.log('script end')
  ```
  执行顺序：script start => async2 end => Promise => script end => promise1 => promise2 => async1 end => setTimeout  

  * 解析：  
    1. 首先执行整个 script
    2. 执行 console.log 输出 `script start`
    3. 调用 async1()，跳到 async2()中，执行console.log 输出 `async2 end`
    4. 因为 await 默认返回 Promise，产生了微任务，将 await 之后的内容放入微任务队列中
    5. 往下遇到 setTimeout()，产生一个宏任务，放入宏任务队列等下下次轮循
    6. 往下执行 Promise()，console.log() 输出 `Promise`
    7. Promise.then()产生两个微任务，放入微任务队列中
    8. 代码继续往下，console.log() 输出 `script end` 
    9. 当前宏任务执行完毕，开始执行微任务队列中的任务，执行输出 `promise1`，往下 promise.then() 产生一个新的微任务执行
    10. 执行产生的新的微任务，输出 `promise2`
    11. async1 重新获得执行权，继续执行输出 `async1 end`
    12. 当前宏任务和其产生的微任务全部执行完毕，进行新一轮轮循，取出下一个宏任务，执行输出 `setTimeout`
    
  * 注意：  
    在 chrome 浏览器的最新版本中不是上面的输出结果，因为 chrome 优化了，await 变得更快了，输出为：  
    script start => async2 end => Promise => script end => async1 end => promise1 => promise2 => setTimeout  

# Node.js 中的 EventLoop  

