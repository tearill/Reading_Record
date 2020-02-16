# let 和 const
- 变量  
  * var   
    1. 可以重复声明  
      var a = 12;  
      var a = 5;
    2. 无法限制修改
    3. 没有块级作用域 
          ```
          {
              
          }

          if() {
              变量 = xxx;
          }

          for() {

          }
          ```
  * let -- 不能重复声明，变量-可以修改，块级作用域
    ```
    let a = 12;
    a = 5;
    ```
  * const --- 不能重复声明，常量-不能修改，块级作用域
    ```
    const a = 12;
    a = 5; // TypeError
    ```

- let 不存在提升，所以必须先声明才能使用

- const 实际上保证的不是变量的值不得改动，而是变量指向的那个把内存地址不得改动  

- ES6 中可用的六种声明变量的方式：  
  var、function、let、const、import、class

  