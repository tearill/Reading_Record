# 作用域闭包

`JavaScript中闭包无处不在，你只需要能够识别并拥抱它`

- 实质问题：  
  
  当函数可以记住并访问所在的词法作用域，就产生了闭包，即使函数是在当前词法作用域之外执行  

  下面我们来看一段代码，清晰地展示了闭包：
  ```js
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
    ```js
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
    把内部函数baz传递给bar，当调用这个内部函数时(现在叫做fn)，它涵盖的foo()内部作用的闭包就可以观察到了，因为它能够访问  
  - 传递函数当然也可以是间接的：  
    
    举个栗子：
    ```js
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
  ```js
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

  要说明闭包，for循环是最常见的例子  
  ```js
  for (var i = 1; i <= 5; i++) {
      setTimeout(function timer () {
          console.log(i);
      }, i * 1000);
  }
  ```
  正常情况下，我们对这段代码行为的预期是分别输出数字1~5，每秒一次，每次一个  

  但实际上，这段代码在运行时会以每秒一次的频率输出五次6  

  仔细想想，这好像又是显而易见的，延迟函数的回调会在循环结束时才执行  

  这个循环的终止条件是 i 不再 <=5，条件首次成立时 i 的值是6，因此，输出显示的是循环结束时 i 的最终值  

  - 缺陷：  

    缺陷是我们试图假设循环中的每个迭代在运行时都会给自己"捕获"一个 i 的副本。但是根据作用域的工作原理，实际情况时尽管循环中的五个函数是在各个迭代中分别定义的，但是它们都被封闭在一个共享的全局作用域中，因此是实际上只有一个 i 
  - 启发：  

    我们需要更多的闭包作用域，特别是在循环的过程中每个迭代都需要一个闭包作用域  

  - IIFE(立即执行函数)解决方案：  
    ```js
    for (var i = 1; i <= 5; i++) {
      (setTimeout(function timer () {
          var j = i;
          console.log(j);
      }, j * 1000))();
    }
    ```
    IIFE会通过声明并立即执行一个函数来创建作用域，它需要有自己的变量，用来在每个迭代中存储 i 的值  
    
    可以对这段代码进行一些改进：  
    ```js
    for (var i = 1; i <= 5; i++) {
      (setTimeout(function timer (j) {
          console.log(j);
      }, j * 1000))(i);
    }
    ```
    在迭代内使用IIFE会为每个迭代都生成一个新的作用域，使得延迟函数的回调可以将新的作用域封闭在每个迭代内部，每个迭代中都会含有一个具有正确值的变量供我们访问  

- 重返块作用域  

  我们使用IIFE在每次迭代时都创建一个新的作用域，换句话说，每次迭代我们都需要一个块作用域。let 可以用来劫持块作用域，并且在这个块作用域中声明一个变量，本质上这是将一个块转换成一个可以被关闭的作用域  
  ```js
  for (var i = 1; i <= 5; i++) {
      setTimeout(function timer () {
          let j = i; // 是的，闭包的块作用域！
          console.log(j);
      }, j * 1000);
  }
  ```
  for循环头部的let声明还会有一个特殊的行为，这个行为指出变量在循环过程中不止被声明一次，每次迭代都会声明，随后的每个迭代都会使用上一个迭代结束时的值来初始化这个变量  
  ```js
  for (let i = 1; i <= 5; i++) {
      setTimeout(function timer () {
          console.log(i);
      }, i * 1000);
  }
  ```

- 模块  
  ```js
  function foo() {
      var something = "cool";
      var another = [1, 2, 3];

      function doSomething () {
          console.log(something);
      }

      function doAnother () {
          console.log(another).join("!");
      }
  }
  ```
  这里并没有明显的闭包，只有两个私有数据变量something和another，以及doSomething()和doAnother()两个内部函数，它们的词法作用域(而这就是闭包)也就是foo()的内部作用域  

  另一段代码：  

  ```js
  function coolModule() {
      var something = "cool";
      var another = [1, 2, 3];

      function doSomething () {
          console.log(something);
      }

      function doAnother () {
          console.log(another).join("!");
      }

      return {
          doSomething: doSomething,
          doAnother: doAnother
      };
  }

  var foo = coolModule();

  foo.doSomething(); // cool
  foo.doAnother(); // 1!2!3!
  ```
  这个模式在JavaScript中被称为模块，最常见的实现模块模式的方法通常被称为模块暴露  

  coolModule()只是一个函数，必须要通过调用它来创建一个模块实例，如果不执行外部函数，每部作用域和闭包都无法被创建  

  coolModule()返回一个用对象字面乱搞语法来表示的对象，这个返回对象中含有对内部函数而不是内部数据变量的引用，我们保持内部数据变量时隐藏且私有的状态，可以将这个对象类型的返回值看作本质上是模块的公共API  

  -  模块模式需要具备两个必要条件
     1. 必须有外部的封闭函数，该函数必须至少被调用一次(每次调用都会创建一个新的模块实例)
     2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并且可以访问或者修改私有的状态  

  一个具有函数属性的对象本身并不是真正的模块。从方便的观察的角度看，一个从函数调用所返回的，只有数据属性而没有闭包函数的对象并不是真正的模块  

  当只需要一个实例时，可以将上面的模式进行简单的改进来实现单例模式(使用立即调用函数，立即调用CoolModule()函数并将返回值直接赋值给单例的模块实例标识符foo)   

  模块也是普通的函数，因此可以接受参数：  
  ```js
  function CoolModule(id) {
      function identify () {
          console.log(id);
      }

      return {
          identify: identify
      };
  }

  var foo1 = CoolModule("foo 1");
  var foo2 = CoolModule("foo 2");

  foo1.identify(); // "foo 1"
  foo2.identify(); // "foo 2"
  ```
  模块模式另一个简单但强大的用法时命名将要作为公共API返回的对象：  
  ```js
  var foo = (function CoolModule(id) {
      function change() {
          // 修改公共API
          publicAPI.identify = identify2;
      }
     
      function identify1 () {
          console.log(id);
      }

      function identify2 () {
          console.log(id.toUpperCase());
      }

      var publicAPI = {
          change: change;
          identify: identify1
      }

      return publicAPI;
  })("foo module");

  foo.identify(); // foo module
  foo.change();
  foo.identify(); // FOO MODULE
  ```

- 现代的模块机制  
  ```js
  var MyModules = (function Manager () {
      var modules = {};

      function define (name, deps, impl) {
          for (var i = 0; i < deps.length; i++) {
              deps[i] = modules[deps[i]];
          }
          modules[name] = impl.apply(impl, deps);
      }

      function get(name) {
          return modules[name];
      }

      return {
          define: define,
          get: get
      };
  })();
  ```
  下面展示了如何使用它来定义模块：
  ```js
  MyModules.define("bar", [], function () {
      function hello(who) {
          return "Let me introduce: " + who;
      }

      return {
          hello: hello
      };
  });

  MyModules.define("foo", ["bar"], function(bar) {
      var hungry = "hippo";

      function awesome() {
          console.log(bar.hello(hungry).toUpperCase());
      }

      return {
          awesome: awesome
      };
  });

  var bar = MyModules.get("bar");
  var foo = MyModules.get("foo");

  console.log(
      bar.hello("hippo");
  ); // Let me introduce: hippo

  foo.awesome(); // LET ME INTRODUCE: HIPPO
  ```

- 未来的模块机制  
  import  
  export  