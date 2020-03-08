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
  (new Promise() 构造函数里面的代码是同步代码，不是微任务)  

  微任务：
  1. process.nextTick --- Node独有  
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

- 立即 resolve 的 Promise 对象，是在本轮"事件循环"(event loop)的结束时，而不是在下一轮"事件循环"的开始时 --- d.js  

# NodeJS 中的 EventLoop  
- 掘金👉https://juejin.im/post/5e5c7f6c518825491b11ce93

- Node 中也有宏任务和微任务，与浏览器中的事件循环类似  
  Node 与浏览器事件循环不同，其中有多个宏任务队列  
  宏任务:  
  1. setTimeout  
  2. setInterval  
  3. setImmediate  
  4. script（整体代码)  
  6. I/O  
  7. UI redering  
  8. requestAnimationFrame   

  微任务：  
  1. process.nextTick(与普通微任务有区别，在微任务队列执行之前执行) --- process.nextTick 是一个独立于 eventLoop 的任务队列  
  2. new Promise().then(回调)  
  3. Objeect.observe  
  4. MutationObserver

  在每一个 eventLoop 阶段完成后会去检查 nextTick 队列，如果里面有任务，会让这部分任务优先于微任务执行  
  
- NodeJS 事件循环机制的六个阶段 --- 每个阶段对应一个宏任务队列，把宏任务进行了分类  
  1. timers(计时器)  
     执行 setTimeout 以及 setInterval 的回调  
  2. I/O callbacks  
     处理网络、流、TCP 的错误回调  
  3. idel, prepare --- 闲置阶段  
     node 内部使用  
  4. poll(轮循)  
     执行 poll 中的 I/O 队列，检查定时器是否到时间  
  5. check(检查)  
     存放 setImmediate 回调  
  6. close callbacks  
     关闭回调，例如 sockect.on('close')  

- 执行的轮循顺序 --- 每个阶段都要等对应的宏任务队列执行完毕才会进入到下一个阶段的宏任务队列  
  1. timers  
  2. I/O callbacks  
  3. poll  
  4. setImmediate  
  5. close events  

  每两个阶段之间执行微任务队列  

- EventLoop 过程：  
  1. 执行全局的 script 同步代码  
  2. 执行微任务队列，先执行所有 Next Tick 队列中的所有任务，再执行其他的微任务队列中的所有任务  
  3. 开始执行宏任务，共六个阶段，从第一个阶段开始执行自己宏任务队列中的所有任务(浏览器是从宏任务队列中取第一个执行！！)  
  4. 每个阶段的宏任务执行完毕之后，开始执行微任务  
  5. TimersQueue -> 步骤2 -> I/O Queue -> 步骤2 -> Check Queue -> 步骤2 -> Close Callback Queue -> 步骤2 -> TimersQueue ...

## setTimeout 和 setImmediate(重点)  
  - setImmediate() 方法用于中断长时间运行的操作，并在浏览器完成其他操作（如事件和显示更新）后立即运行回调函数  
    ```js
    setTimeout(() => {
      console.log('setTimeout')
    }, 0)

    setImmediate(() => {
      console.log('setImmediate')
    })

    //! 两种情况都有可能，多次执行结果不一样，顺序取决于 node 的准备时间
    // setTimeout
    // setImmediate

    // setImmediate
    // setTimeout
    ```
    > setTimeout 和 setImmediate 执行顺序不固定，取决于 node 的准备时间  
  - 原因：  

    setTimeout/setInterval 的第二个参数(时间)取值范围是：[1, 2^31-1]，如果超过这个范围则会初始化为 1， 即：setTimeout(fn, 0) === setTimeout(fn, 1) -> 结果一样，都是在 1ms 之后才执行  

    setTimeout 的回调函数在 timers 阶段执行，setImmediate 的回调函数在 check 阶段执行，Event Loop 的开始会先检查 timers 阶段，但是在代码开始运行之前到 timers 阶段(代码的启动、运行)会消耗一定的时间，所以会出现两种情况：  
      1. timers 前的准备时间超过 1ms，满足 loop -> timers >= 1，setTimeout 的时钟周期到了，则执行 timers 阶段(setTimeout)的回调函数  
      2. timers 前的准备时间小于 1ms，还没到 setTimeout 预设的时间，则先执行 check 阶段(setImmediate)的回调函数，下一次 Event Loop 再执行 timers 阶段执行 timer 阶段(setTimeout)的回调函数  

    思考：  
      1. 如果要使上面代码中的 setTimeout 一定先执行 --- 手动延长准备时间 --- setTimeout.js  
         ```js
         const start = Date.now()
         while (Date.now() - start < 10);
         ```
         没有到时间就一直执行循环  
      2. 如果要使上面代码中的 setImmediate 一定先执行 --- 控制程序的运行环境，把程序控制在 timers 阶段之后 --- setImmediate.js  
         让程序至少从 I/O callbacks 阶段开始 --- 可以套一层文件读写把把程序控制在 I/O callbacks 阶段的运行环境中  

## Node 11.x 新变化  
   
   timers 阶段的执行有所变化  
   ```js
   setTimeout(() => console.log('timeout1'))
   setTimeout(() => {
     console.log('timeout2')
     Promise.resolve().then(() => console.log('promise resolve'))
   })
   setTimeout(() => console.log('timeout3'))
   setTimeout(() => console.log('timeout4'))
   ```
   1. node 10 及之前的版本：  
      要考虑上一个定时器执行完成时，下一个定时器是否到时间加入了任务队列中，如果未到时间，先执行其他的代码  
   2. node 11 及其之后的版本：  
      一旦执行一个阶段里的一个宏任务(setTimeout, setInterval 和 setImmediate)就立刻执行微任务队列  
      跟浏览器端运行一致  
  
## 浏览器端和 Node 端有什么不同  
  1. 浏览器端的 Event Loop 和 Node.js 中的 Event Loop 是不同的，实现机制也不一样  
  2. Node.js 可以理解成有4个宏任务队列和2个微任务队列，但是执行宏任务时有6个阶段  
  3. Node.js 中限制性全局 script 代码，执行完同步代码后，先从微任务队列 Next Tick Queue 中取出所有任务放入调用栈执行，再从其他微任务队列中取出所有任务放入调用栈中执行，然后开始宏任务的6个阶段，每个阶段都将其宏任务队列中的所有任务都取出来执行(浏览器是只取第一个执行)，每个宏任务阶段执行完毕之后开始执行微任务，再开始执行下一阶段宏任务，以此构成事件循环  
  4. 宏任务包括 ....  
  5. 微任务包括 ....  


