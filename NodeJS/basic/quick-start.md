# 快速上手 Node 开发和基本概念  

## 什么是 Node？  
  Node 是 JS 的运行环境，在服务器端的运行环境  
  Node 包括 V8 引擎，Node 将 V8 引擎加工成可以在任何操作系统中运行 JavaScript 的平台  

## 运行 Node 代码  
  1. 在 REPL 中交互式输入和运行  
  2. 将代码写入 JS 文件，并用 Node 执行  
  > REPL 全称 Read Eval Print Loop (读取-执行-输出-循环)  

- 浏览器和 Node 环境中的 console.log()  
  1. 在浏览器运行 console.log 调用了 BOM，实际上执行的是 window.console.log  
  2. Node 首先在所处的操作系统中创建一个新的进程，然后向标准输出打印了指定的字符串，实际上执行的是 process.stdout.write  

  ode 为我们提供了一个无需依赖浏览器环境、能够直接与操作系统进行交互的 JavaScript 代码运行环境  

## Node 全局对象  
  JavaScipt 的全局对象可以分为四类：  
  1. 浏览器专属，例如 window、alert  
  2. Node 专属，例如 process、__dirname、__filename  
  3. 浏览器和 Node 共有，但是实现方式不一样，例如 console、setTimeout、setInterval 等  
  4. 浏览器和 Node 共有，ECMAScript 语言定义的一部分，例如 Date、String、Promise 等  

## Node 专属全局对象解析  
- process  
  process 全局对象是 Node 的灵魂，它是管理当前 Node 进程状态的对象，提供了与操作系统的简单接口  
  process 对象的一些属性：  
  1. pid：进程编号  
  2. env：系统环境变量  
  3. argv：命令行执行此脚本时的输入参数  
  4. platform：当前操作系统平台  
  
- Buffer  
  Buffer 全局对象让 JavaScript 也能轻松地处理二进制数据流  
  结合 Node 地流接口(Stream)，能够实现搞笑地二进制文件处理  

- __filename 和 __dirname  
  这两个全局对象分别代表当前所运行 Node 脚本地文件路径(绝对路径)和所在目录路径  
  ```js
  setTimeout(() => {
    console.log('Hello World!');
  });

  console.log('当前进程 ID', process.pid);
  console.log('当前脚本路径', __filename);

  const time = new Date();
  console.log('当前时间', time.toLocaleString());
  ```
  运行以上脚本，Hello Wordld! 会延迟三秒输出  
  在 setTimeout 等待地 3s 内，程序并没有阻塞，而是继续向下执行，这就是 Node 的异步非阻塞  

  在实际应用中，会有很多 I/O 操作(例如网络请求，数据库查询等) 需要耗费大量的时间，而 Node 能够在等待的同时继续处理新的请求，大大提高了系统的吞吐率  

## 理解 Node 的模块机制  
- 什么是 Node 模块  
  通常来说，Node 模块可分为两大类：  
  1. 核心模块：Node 提供的内置模块，在安装 Node 时已经被编译成**二进制可执行文件**  
  2. 文件模块：用户编写的模块，可以是自己写的，也可以是通过 npm 安装的  
  
  其中，文件模块可以是一个单独的文件(以 .js、.node 或 .json 结尾)，或者是一个目录。当这个模块是一个目录时，模块名就是目录名，有两种情况：  
  1. 目录中有一个 package.json 文件，则这个 Node 模块的入口就是其中 main 字段所指向的文件  
  2. 目录中有一个名为 index 的文件，扩展名为 .js、.node、或 .json，此文件则为模块的入口文件  

- Node 模块机制浅析  
  具体而言，Node 引入了三个新的全局对象：  
  1. require  
  2. exports  
  3. module  

  - require  
    require 用于导入其他 Node 模块，其参数接受一个字符串代表模块的名称或路径，通常被成为模块标识符  
    具体有以下三种形式：  
    1. 直接写模块名称，通常是核心模块或第三方文件模块，例如 os、express 等  
    2. 模块的相对路径，指向项目中其他 Node 模块，例如 ./utils  
    3. 模块的绝对路径(不推荐)，例如 /home/xxx/MyProject/utils  

    举个栗子：  
    ```js
    // 导入内置库或第三方模块  
    const os = require('os');
    const express = require('express');

    // 通过相对路径导入其他模块  
    const utils = require('./utils');
    
    // 通过绝对路径导入其他模块  
    const utils = require('/home/xxx/MyProject/utils')
    ```
  
  - exports  
    exports 用于导出 Node 模块  
    ```js
    // myModule.js
    function add(a, b) {
      return a + b
    }

    // 导出函数 add 
    exports.add = add
    ```

    ```js
    // main.js
    const myModule = require('./myModule')

    // 调用 myModule.js 中的 add 函数
    myModule.add(1, 2)
    ```

  - module  
    模块对象  
    module 对象有如下字段：  
    1. id：模块的唯一标识，如果是被运行的主程序(例如 main.js)则为 `.` ，如果是被导入的模块则等同于此文件名(例如 myModule.js)  
    2. path 和 filename：模块所在路径和文件名  
    3. exports：模块所导出的内容，实际上之前的 exports 对象是指向 module.exports 的引用  
       例如对于 myModule.js，刚才导出了 add 函数，因此出现在了这个 exports 字段里面，而 main.js 没有导出任何内容，因此 exports 字段为空  
    4. parent 和 children：用于记录模块之间的导入关系，例如 main.js 中 require 了 myModule.js 那么 main 就是 myModule 的 parent，myModule 就是 main 的 children  
    5. loaded：模块是否被加载，只有 children 中列出的模块才会被加载  
    6. paths：这个就是 Node 搜索文件模块的路径列表，Node 会从第一个路径到最后一个路径依次搜索指定的 Node 模块，找到了则导入，找不到就会报错  
    > Node 文件模块查找路径的方式：先找当前目录下的 node_modules，没有的话再找上一级目录的 node_modules，还没找到的话就一直向上找，直到根目录下的 node_modules  