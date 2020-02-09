# 原型  

- [[Prototype]]  
  
  内置属性，其实就是对其他对象的引用  

  几乎所有的对象在创建的[[Prototype]]属性都会被赋予一个非空的值 

  对于`默认`的[[Get]]操作来说，如果无法在对象本身找到需要的属性，就会继续访问对象的[[Prototype]]链  

  使用for..in遍历的时候会访问原型链上所有enumerable的属性  

  使用 in 操作符来检查属性在对对象中是否存在时，也会查找整个原型链(无论属性是否可枚举)

- Object.prototyoe  
  
  所有普通的[[Prototype]]链最终都会指向内置的Object.prototype  

- 属性设置和屏蔽  

  给一个对象设置属性并不仅仅是添加一个新属性或者修改已有的属性值  

  举个栗子：
  ```
  myObject.foo = "bar";
  ```
  - 如果myObject对象中包含名为foo的普通数据访问属性，会直接修改已有的属性值

  - 如果foo不是直接存在于myObject中，[[Prototype]]链会被遍历，类似[[Get]]。如果原型链上找不到foo，foo就会被直接添加到myObject上    

  - 如果foo存在于原型链上：  
     1. 如果在[[Prototype]]链上层存在名为foo的普通数据访问属性并且没有标记为只读，就会直接在myObject中添加一个名为foo的新属性，它是屏蔽属性(屏蔽原型链上层)  
     
     2. 如果在[[Prototype]]链上层存在foo，但是它被标记为只读，就无法修改已有属性或者在myObject上创建屏蔽属性(不会发生屏蔽)  

     3. 如果在[[Prototype]]链上层存在foo并且它是一个setter，那就一定会调用这个setter。foo不会被添加到(或者说屏蔽于)myObject，也不会重新定义foo这个setter
  - 如果foo既出现在myObject中也出现在myObject的[[prototype]]链上层，那么就会发生屏蔽，myObject中的foo属性会屏蔽原型链上层的所有foo属性，因为myObject.foo总是会选择原型链中最底层的foo属性  

  - 有些情况下会隐式产生屏蔽  
    举个栗子：
    ```
    var anotherObject = {
        a: 2
    };

    var myObject = Object.create(anotherObject);

    anotherObject.a; // 2
    myObject.a; // 2

    anotherObject.hasOwnProperty("a"); // true
    myObject.hasOwnProperty("a"); // true

    myObject.a++; // 隐式屏蔽！

    anotherObject.a; // 2
    myObject.a; // 3

    myObject.hasOwnProperty("a"); // true
    ```
    尽管 `myObject.a++;` 看起来应该(通过委托)查找并添加 anotherObject.a 属性，但是 ++ 操作相当于 `myObject.a = myObject.a + 1` 因此，++ 操作首先会通过[[prototype]]查找属性 a 并从 anotherObject.a 获取当前属性值2，然后给这个值加1，接着用[[Put]]将值3赋给 myObject 中新建的屏蔽属性 a

- "类"  

  - "类"函数  
    ```
    function Foo() {
        // ...
    }

    Foo.prototype; // { }
    ```
    通过调用new Foo()创建的每个对象将最终被[[prototype]]链接到这个 Foo.prototype 对象  

    通过new创建得到了两个对象，它们之间相互关联，并没有从"类"中复制任何行为到一个对象中，只是让两个对象相互关联  


  - "构造函数" 
    ```
    function Foo() {
        // ...
    }

    Foo.prototype.constructor === Foo; // true

    var a = new Foo();
    a.constructor === Foo(); // true
    ``` 
    Foo.prototype默认有一个公用并且不可枚举的属性 .constructor，引用的是对象关联的函数(Foo)，通过"构造函数"调用new创建的对象也有一个.constructor属性，指向"创建这个对象的函数"
    1. 构造函数还是调用  

       函数本身并不是构造函数，当在普通函数前加上 new 关键字之后会把函数调用变成一个"构造函数调用"。new 会劫持所有普通函数并用构造对象的形式来调用它  
       举个栗子：
       ```
       function NothingSpecial() {
         console.log("Don't mind me!");
       }

       var a = new NothingSpecial();
       // Don't mind me!

       a; // {}
       ```
       无论如何都会构造一个对象(new的副作用)  

       `JavaScript中对于"构造函数"最准确的解释是，所有带 new 的函数调用`  

  - 技术  

    "面向类"的技巧：  

    this.val = val;  
    ObjectName.prototype.method = {...}

    - 回顾构造函数  
    
      constructor 并不是表示(对象)被(它)构造，而是指向原型链上层的 `constructor`  

      比如：如果你创建了一个新对象并替换了默认的 `.prototype` 引用，那么新对象并不会自动获取 `.constructor` 属性  

      举个栗子：
      ```
      function Foo() { /* .. */}

      Foo.prototype = { /* .. */}; // 创建一个原型对象

      var a1 = new Foo();
      a1.constructor === Foo; // false
      a1.constructor === Object; // true
      ```
      a1 并没有 `.constructor` 属性，所以会委托给Foo.prototype，但是这个对象也没有，所以它会继续委托给顶端的 `Object.prototype`，然后指向内置的Object(..)函数  

- (原型)继承  
  
  调用Object.create(..)会凭空创建一个"新"对象并且把对象内部的 [[prototype]] 关联到你指定的对象  

  `Bar.prototype = Foo.prototype`： 只是让 `Bar.prototype` 直接引用 `Foo.prototype`，如果执行类似 `Bar.prototype.myLabel = ...` 的赋值语句会直接修改 `Foo.prototype` 对象  

  `Bar.prototype = new Foo()`： 会创建一个关联到 `Foo.prototype` 的新对象，但是它使用了 Foo 的"构造函数调用"，如果函数 Foo 有一些副作用(比如修改状态、给 this 添加属性等)，会影响到 Bar() 的"后代"

- 检查"类"关系  
  
  ```
  Foo.prototype.isPrototypeOf(a);

  b.isPrototypeOf(c);

  Object.getPrototypeOf(a);

  a.__proto__ = Foo.prototype;
  ```

- 对象关联  

  [[prototype]] 机制就是存在于对象中的一个内部链接

  - 创建关联  
    
    Object.create(null) 会创建一个拥有空(null) [[prototype]]链接的对象，这个对象无法进行委托，通常被称作"字典"，它们完全不会受到原型链的干扰，因此非常事故和用来存储数据  

    Object.create()的polyfill代码 --- p160-161

  - 关联关系是备用 --- p161-162

- 小结  

  [[Get]] 操作可能会遍历原型链  

  关联两个对象最常用的方法是使用 new 关键字进行函数调用  

  JavaScript 机制和传统语言的 "类初始化" 和 "类继承" 很相似，但是 JavaScript 中的机制有一个核心区别，那就是不会进行复制，对象之前是通过内部的 [[prototype]] 链关联的  

  "委托" 更适合描述 JavaScript 的真实机制

  

