# 作用域闭包

`JavaScript中闭包无处不在，你只需要能够识别并拥抱它`

- 实质问题：  
  
  当函数可以记住并访问所在的词法作用域，就产生了闭包，即使函数是在当前词法作用域之外执行  

  下面我们来看一段代码，清晰地展示了闭包：
  ```
  function foo() {
      var a = 2;

      function bar() {
          console.log(a);
      }

      return bar;
  }

  var baz = foo();

  baz(); // 2 ---这就是闭包的效果
  ```
  - 拜bar()所声明的位置所赐，它拥有涵盖foo()内部作用域的闭包，使得该作用域能够一直存活，以供bar()在之后的任何时间进行引用
  - bar()依然持有对该作用域的引用，而这个引用就叫做闭包
  - 当然，无论使用何种方式对函数类型的值进行传递，当函数在别处调用时都可以观察到闭包  

    举个栗子：
    ```
    function foo() {
        var a = 2;

        function baz() {
            console.log(a); // 2
        }

        bar(baz);
    }

    function bar(fn) {
        fn(); // 妈妈快看呀，这就是闭包！
    }

    foo();
    ```
    把内部函数baz传递给bar，当调用这个内部函数时(现在叫做fn)，它涵盖的foo()内部作用的闭包就可以观察到了，因为它能够访问a
  - 传递函数当然也可以是间接的：
    
    举个栗子：
    ```
    var fn;

    function foo() {
        var a = 2;

        function baz() {
            console.log(a);
        }

        fn = baz(); // 将baz分配给全局变量
    }

    function bar() {
        fn(); // 妈妈快看呀，这就是闭包！
    }

    foo();

    bar(); // 2
    ```
`无论通过何种手段将内部函数传递到所在的词法作用域以外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包`

- 现在我懂了
  
  写过的代码中闭包的身影
  ```
  function wait(message) {
      setTimeout(function timer() {
          console.log(message);
      }, 1000);
  }
  wait("Hello, closure!);
  ```
  - 将一个内部函数(名为timer)传递给setTimeout(...)。timer具有涵盖wait(...)作用域的闭包，因此还保有对变量message的引用
  - wait(...)执行1000毫秒后，它的内部作用域并不会消失，timer函数依然包邮wait(...)作用域的闭包
  - 在引擎内部，内置的工具函数setTimeout(...)持有对一个参数的引用，这个参数也许叫做fn或者func，或者其他类似的名字。引擎会调用这个函数，在例子中就是内部的timer函数，而词法作用域在这个过程中保持完整
  `这就是闭包`
  `在定时器、事件监听器、Ajax请求、跨窗口通信、Web Workers或者任何其他的异步(或者同步)任务中，只要使用了回调函数，实际上就是在使用闭包`

- 循环和闭包