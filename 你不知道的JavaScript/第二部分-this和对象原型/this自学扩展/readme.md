# this 
- JavaScript在创建上下文执行的时候就生成了 this  
- 非严格模式下浏览器 this 指向 window，严格模式下浏览器 this 指向 undefined，node(终端环境下)全局 this 指向 global  
- 如果一个函数中有 this，但是它没有被上一级对象调用，那么 this 指向的就会使 window
- 如果一个函数中有 this，它有被上一级调用，那么 this 指向的就会是上一级对象
- 如果一个函数中有 this，尽管这个函数是被最外层的对象所调用的，this 还是会指向它的上一级对象
- 修改 this 作用域的方法：call、apply、bind，使用 bind 方法给一个函数进行 this 作用域的绑定，会覆盖掉 call、apply 的指向
- this 和 return  

  如果返回的是一个对象，那么 this 就指向返回的对象  

  如果返回的不是对象，那么 this 还是指向函数实例  

  如果返回的是 null，this 还是指向函数实例
- 箭头函数  

  ES6 箭头函数中 this 的指向取决于创建的位置