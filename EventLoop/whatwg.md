## whatwg 下的 Event Loop  
为了协调 event、用户交互、脚本、呈现、网络等  

## 分类  
- window event loop  
- worker event loop  
- worklet event loop  

事件循环有一个或多个 task queue  
task 的产生可能来自于：  
- Events
- Parsing  

每个事件循环都有一个正在运行的 task  
每个事件循环都有一个 microtask queue  
每个事件循环都有 microtask checkpoint 布尔值(最初为 false)  

## process  
事件循环只要存在，就必须不断地执行以下步骤：  
  - 从 taskQueue 中取出第一个可运行任务，执行  
  - 遇到 Microtask  
    - 如果 microtask checkpoint 为 true，则返回  
    - Set microtask checkpoint true  
    - 只要 microtask queue 不为空：  
      - 运行 microtask  
      - Set microtask to false  
  - Update the rendering  

- 每次从 taskQueue 中取出第一个可运行任务，执行
- 如果有 microtask queue，那么只要 microtask queue 不为空，一直运行 microtask  
- 如果有需要，那么会发生 rendering  

- 一个 task  
- 所有的 microtask  
- render  

## 任务的分类  
主要有两个类型，不同类型的任务放到不同的队列  

microtask 类型:  
- process.nextTick
- MutationObserver 回调
- Promise.then 回调

task 类型:  
- 主代码块
- setTimeout
- setInterval
- setImmediate

task === MacroTask  