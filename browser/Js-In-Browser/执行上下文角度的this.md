# 从执行上下文角度看 this

## JavaScript 中的 this

![this](./this.png)

this 存储在执行上下文，每一个执行上下文中都有一个 this

执行上下文主要有三种：全局执行上下文、函数执行上下文和 eval 执行上下文，对应的 this 也只有三种

## 全局执行上下文中的 this

在浏览器中，全局执行上下文中的 this 是指向 window 对象的

作用域链的最底端包含了 window 对象

## 函数执行上下文中的 this

```js
function foo() {
  console.log(this);
}
foo();
```

打印结果是 window，foo 的调用是在全局环境下的

### 1. 通过 call/apply/bind 设置 this

```js
let bar = {
  myName : " bar ",
  test1 : 1
}
function foo(){
  this.myName = " foo "
}
foo.call(bar)
console.log(bar)
console.log(myName)
```

call 将函数内部 this 指向特定的对象，打印结果为 foo，myName 的打印结果为 ReferenceError

### 2. 对象调用设置 this

```js
var myObj = {
  name : " myObj ",
  showThis: function(){
    this.name = " objName "
    console.log(this)
  }
}
var foo = myObj.showThis
foo()
```

结果是 window，结果取决于调用方式

前提：浏览器环境下

- **在全局环境中调用一个函数，函数内部的 this 指向的是全局变量 window**
- **通过一个对象来调用其内部的一个方法，该方法的执行上下文中的 this 指向对象本身**

### 3. 通过构造函数中设置

```js
function CreateObj(){
  this.name = " newObj "
}
var myObj = new CreateObj()

```

执行 new 操作的时候发生了四件事：

- 以 CreateObj 为原型创建/构造一个全新的对象（空对象 tmpObj）
- 调用 CreateObj.call(tmpObj)，当 CreateObj 执行上下文创建的时候，this 指向 tmpObj
- 执行 CreateObj 函数，CreateObj 函数执行上下文中的 this 指向 tmpObj
- 返回 tmpObj 对象

## this 缺陷和应对方案

### 1. 嵌套函数中的 this 不会从外层函数中继承

```js
var myObj = {
  name : " obj ", 
  showThis: function(){
    console.log(this)
    function bar(){console.log(this)}
    bar()
  }
}
myObj.showThis()
```

bar 中的 this 指向的是 window，showThis 中的 this 指向的是 myObj

解决方案：

- 使用一个变量保存外层作用域

  let _this = this

- 使用箭头函数

  箭头函数的 this 取决于外部函数

### 2. 普通函数中的 this 默认执行全局对象 window

解决方案：

- 使用 call/apply 等显式调用
- 严格模式：严格模式下 this 指向 undefined

