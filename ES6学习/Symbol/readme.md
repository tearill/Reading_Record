# ES6 中新增数据类型 --- Symbol
- JS 中的数据类型  
  - 基本数据类型  
    数值 Number  
    字符 String  
    布尔值 Boolean  
    null  
    undefined  
    `Symbol`
  - 复杂数据类型  
    Object  

-------------------------------------------------------

- Symbol 的出现是为了保证变量名的唯一性  

- Symbol 的基本用法：  
  ```js
  lets = Symbol(); 
  typeof s // "symbol" 
  ```
  Symbol 函数前不能用 new，因为 Symbol 生成的是一个原始类型的值，不是对象  
  * 如果 Symbol 的参数是一个对象，就会调用该对象的 toString 方法，将其转为字符串，然后才生成一个 Symbol 值

- 注意：  
  Symbol 函数的参数只表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返回值是不相等的 
  ```js
  // 没有参数的情况 
  var sl = Symbol(); 
  var s2 = Symbol(); 
  sl === s2 // false 
  ```
  ```js
  // 有参数的情况 
  var sl = Symbol ('foo'); 
  var s2 = Symbol ('foo'); 
  sl === s2 // false 
  ```

- Symbol 值可以显式转为字符串和布尔值   
  ```js
  var sym = Symbol ('My symbol') ; 
  String(sym); // 'Symbol(My symbol)'
  sym. toString(); // Symbol (My symbol)’ 
  ```
  ```js
  // 另外， Symbol 值也可以转为布尔值，但是不能转为数值
  var sym =Symbol(); 
  Boolean(sym); // true 
  ! sym // false 
  ```

> 每一个 Symbol 值都是不相等的，所以 Symbol 值可以作为标识符用于对象的属性名，保证不会出现同名属性，对于一个对象由多个模块构成的情况非常有用，能防止某个键被不小心改写或覆盖 
> 
> `Symbol 值作为对象属性名时不能使用点运算符`

-------------------------------------------------------

- 遍历问题  
  Symbol 作为属性名，该属性不会出现在 for...in、 for...of 循环中  

  Object .getOwnPropertySymbols 方法可以获取指定对象的所有 Symbol 属性名，返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
  ```js
  var obj= {}; 
  var a = Symbol ('a') ; 
  var b =Symbol ('b'); 

  obj[a] = 'Hello'; 
  obj[b] = 'World '; 

  var objectSymbols = Object.getOwnPropertySymbols(obj);
  objectSymbols; // [Symbol(a), Symbol(b)] 
  ```

- 重新使用同一个 Symbol 值：  
  1. Symbol.for(val) --- 搜索是否有以 val 作为名称的 Symbol 值  
    如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值  

  2. Symbol.keyFor 方法返回一个己登记的 Symbol 类型值的 key
      ```js
      var sl = Symbol.for("foo")；
      Symbol.keyFor(sl) // "foo"
      ```

  > Symbol.for() 与 Symbol() 这两种写法都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，而后者不会  
  > Symbol.for 为 Symbol 值登记的名字是全局环境的，可以在不同的 iframe 或 service worker 中取到同一个值。