# 提升

- 先有鸡还是先有蛋
  直觉上可能会认为JavaScript代码在执行时是由上到下一行一行执行的。但实际上这并不完全正确，有一种特殊的情况会导致这个假设是错误的  

  举个栗子：
  ```
  a = 2;

  var a;

  console.log(a);
  ```
  输出结果是 2

- 提升  

  上一个代码段中会被以如下的形式进行处理：
  ```
  var a;

  a = 2;

  console.log(a);
  ```
  其中第一部分是编译，而第二个部分是执行  

  这个过程就好像变量和函数声明从它们在代码中出现的位置被"移动"到了最上面。`这个过程就叫做提升`  

  实质：将变量和函数声明提前  

  `只有声明本身会被提升，而赋值或其他运行逻辑会被留在原地`  
  
  `函数声明会被提升，函数但是函数表达式却不会被提升`  

  举个栗子：
  ```
  foo(); // 不是ReferenceError，而是TypeError！

  var foo = function bar() {
      // ...
  };
  ```
  - foo()声明被提升并分配给所在作用域(在这里是全局作用域)，因此foo()不会导致 ReferenceError
  - 但是此时oo并没有赋值(如果它是一个函数声明而不是函数表达式，那么就会赋值)
  - foo由于对undefined值进行函数调用而导致非法操作，因此抛出TypeError异常

- 函数优先  

  函数声明和变量声明都会被提升，但是函数会首先被提升，然后才是变量  

  举个栗子：
  ```
  foo(); // 1

  var foo;

  function foo() {
      console.log(1);
  };

  foo = function() {
      console.log(2);
  };
  ```
  会输出1而不是2！这个代码片段会被引擎理解为如下形式：
  ```
  function foo() {
      console.log(1);
  };

  foo(); // 1

  foo = function() {
      console.log(2);
  };
  ```
  ps：var foo尽管出现在function foo()...的声明之前，但它是重复的声明(因为被忽略)，因为函数声明会被提升到普通变量之前  

  尽管重复的var声明会被忽略掉，但出现在后面的函数声明还是可以覆盖前面的  
  
  举个栗子：
  ```
  foo(); // 3

  function foo() {
      console.log(1);
  };

  var foo = function() {
      console.log(2);
  };

  function foo() {
      console.log(3);
  }
  ```
  