# new 操作符的实现原理  

- prototype(显式原型链) 
  ```
  function abc() {

  }
  abc.prototype => {constructor: f}
  ``` 

- \_\_proto\_\_ (隐式原型链) --- 私有属性  

  隐式原型指向这个对象的函数的 prototype  
  ```
  function Abc() {
      this.name = "Horace";
  }

  let test = new Abc();
  test.__proto__ = Abc.prototype
  ```

- 手动实现一个 new 操作符  
  构造函数的内部原理：  
  1. 创建一个新对象
  2. 链接到原型(将构造函数的 prototype 赋值给新对象的__proto__)
  3. 绑定 this (构造函数中的 this 指向新对象并且调用构造函数)
  4. 返回新对象