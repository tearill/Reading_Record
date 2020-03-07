# JS 单线程  

- JS 大会演讲人网站 --- [动态详解](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)  

- 进程：分配CPU资源的基本单位  
  线程：进程的一个实体，是被独立调度和分派的基本单位  

- 准确来说，是js引擎是单线程的  
  js是解释性的语言，解释一行，执行一行，所以具有跨平台性  
  js引擎并不是独立运行的，跨平台意味着js依赖其运行的宿主环境中，大部分情况下是web浏览器  

- 为什么 JS 是单线程语言  
  1. 语言特性决定了 JS 是一个单线程语言 --- 只是一层糖衣而已  
  2. JS 天生是单线程语言 
     + 浏览器需要渲染 DOM  
       JavaScript 可以修改 DOM 结构  
       JavaScript 执行时，浏览器 DOM 渲染停止  
     + 如果 JavaScript 引擎线程不是单线程的，那么可以同时执行多段 JavaScript，如果这多段 JavaScript 都修改 DOM，那么就会出现 DOM 冲突。  
     + 举例：如果两个script同时想修改页面某个节点信息，浏览器就懵了，不知道该执行哪个修改  


- 浏览器是 multi-process 多进程  
  主进程常驻的线程有：  
  1. GUI渲染线程  
  2. JS引擎线程  
  3. 事件触发线程  
  4. 定时器触发线程  
  5. HTTP请求线程  
  
# 浏览器端的 EventLoop  
- 一个调用栈、一个宏任务队列和一个微任务队列  
  宏任务：  
  1. script(整体的代码)
  2. setTimeout()
  3. setInterval()
  4. setImmediate() 
  5. I/O
  6. UI 渲染 --- requestAnimationFrame

  微任务：
  1. process.nextTick
  2. Promise --- Promise.then()
  3. async/await --- 实际就是Promise
  4. MutationObserver(h5新特性) --- 提供了监视对DOM树所做更改的能力  

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
  ```js
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
    可以分成两种情况：  
    1. 如果 await 后面直接跟的为一个变量，比如：await 1  
       这种情况的话相当于直接把 await 后面的代码注册为一个微任务，可以简单理解为 promise.then(await后面的代码) 然后跳出 async 函数，执行其他代码，当遇到 promise 函数的时候，会注册 promise.then() 函数到微任务队列，注意此时微任务队列里面已经存在 await 后面的微任务。所以这种情况会先执行 await 后面的代码（async1 end），再执行async1函数后面注册的微任务代码(promise1,promise2)。
    2. 如果 await 后面跟的是一个异步函数的调用，比如上面的代码，将代码改成这样：

# Node.js 中的 EventLoop  
- 掘金👉https://juejin.im/post/5e5c7f6c518825491b11ce93

- node 中也有宏任务和微任务，与浏览器中的事件循环类似  
  宏任务:  
  1. setTimeout  
  2. setInterval  
  3. setImmediate  
  4. script（整体代码)  
  5. I/O 操作等  

  微任务：  
  1. process.nextTick(与普通微任务有区别，在微任务队列执行之前执行) --- process.nextTick 是一个独立于 eventLoop 的任务队列  
  2. new Promise().then(回调)等  

  在每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行  
  