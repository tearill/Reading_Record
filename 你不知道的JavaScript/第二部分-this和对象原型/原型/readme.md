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

       

  - 技术  

- (原型)继承  

- 检查"类"关系  

- 对象关联  

  - 创建关联  

  - 关联关系是备用  

- 小结  

  

