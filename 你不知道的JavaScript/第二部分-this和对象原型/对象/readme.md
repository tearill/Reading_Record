# 对象  

- 语法  

  对象可以通过两种形式定义：声明(文字)形式和构造形式  

  对象的文字语法：
  ```
  var myObj = {
      key: value
  };
  ```
  构造形式：
  ```
  var myObj = new Object();
  myObj.key = value;
  ```
  唯一的区别是，文字声明中可以添加多个键/值对，构造形式中必须逐个添加属性  

- 类型  

  六种主要类型：  
  string  
  number  
  boolean  
  null  
  undefined  
  object  

- 内置对象  

  String  
  Number  
  Boolean  
  Object  
  Function  
  Array  
  Date  
  RegExp  
  Error  

  在JavaScript中，它们实际上只是一些内置函数。这些内置函数可以当作构造函数来使用，从而可以构造一个对应子类型的新对象  

  null和undefined没有对应的构造形式，它们只有文字形式。相反，Date只有构造，没有文字形式。  

  对于Object、Array、Function和RegExp来说，无论使用文字形式还是构造形式，它们都是对象，不是字面量。  

  Error对象很少在代码中显式创建，一般是在抛出异常时自动被创建。  

- 内容  

  存储在对象容器内部的是这些属性的名称，它们就像指针一样，指向这些值真正的存储位置  

  - 可计算属性  

    ES6增加了可计算属性名，可以在文字形式中使用[]包裹一个表达式来当作属性名：
    ```
    var prefix = "foo";

    var myObject = {
        [prefix + "bar"]: "hello";
        [prefix + "baz"]: "world";
    }

    myObject["foobar"]; // hello
    myObject["foobaz"]; // world
    ```

  - 属性与方法 --- p10-108  

  - 数组  

    数组也是对象，所以虽然每个下标都是整数，仍然可以给数组添加属性，数组length不会改变  

  - 复制对象 --- p109-110  

    ES6实现浅复制：Object.assign(..)  

    第一个是目标对象，之后还可以跟一个或多个源对象  

    它会遍历一个或多个源对象的所有可枚举属性的自有键并把它们复制(使用 = 操作符赋值)到目标对象，最后返回目标对象  

  - 属性描述符  

    在创建普通属性时属性描述符会使用默认值，也可以使用Object.defineProperty(..)来添加一个新属性或修改一个已有属性(如果它是configurable)并对特性进行设置  

    举个栗子：
    ```
    var myObject = {};

    Object.defineProperty(myObject, "a", {
        value: 2,
        writable: true,
        configurable: true,
        enumerable: true
    });
    ```
    1. Writable  
       Writable决定是否可以修改属性的值  

       Writable为false的时候修改会静默失败，在严格模式下报TypeError(表示无法修改一个不可写的属性)

    2. Configurable  
       只要属性是可配置的，就可以使用defineProperty(..)方法来修改属性描述符  

       例外：即便属性是configurable:false，我们还是可以把writable的状态由true改为false，但是无法由false改为true  

       除了无法修改，configurable:false还会禁止删除这个属性，删除会静默失败

    3. Enumerable  

       控制属性是否会出现在对象的属性枚举中，如果把enumerable设置成false，这个属性就不会出现在枚举中，虽然仍然可以正常访问它  

  - 不变性  

    1. 对象常量  
       结合writable:false 和 configurable:false就可以创建一个真正的常量属性(不可修改，重定义或者删除)  

    2. 禁止扩展  
       如果想禁止一个对象添加新属性并且保留已有属性，可以使用Object.preventExtension(..)  
       非严格模式下添加新属性会静默失败，严格模式下报TypeError  

    3. 密封  
       Object.seal(..)会创建一个"密封"的对象，这个方法实际上会在一个现有对象山调用Object.preventExtension(..)并把现有属性标记为configurable:false  
       所以密封之后不仅不能添加新属性，也不能重新配置或删除任何现有的属性(虽然可以修改属性的值)  

    4. 冻结  
       Object.freeze(..)会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(..)并把所有"数据访问"属性标记为writable:false，这样就无法修改它们的值  

       这个方法是可以应用在对象上的级别最高的不可变性，它会禁止对于对象本身及其任意直接属性的修改(这个对象引用的其他对象是不受影响的)  

  - [[Get]]  
     ```
     var myObject = {
         a: 2
     }

     myObject.a; // 2
     ```
    myObject.a实际上是实现了[[GET]]操作，对象默认的内置[[GET]]操作首先在对象中查找是否有名称相同的属性，如果找到就会返回这个属性的值，如果没有找到，就会去遍历可能存在的[[Prototype]]链  

    如果无论如何都没有找到，返回undefined  

  - [[Put]] --- p117  
    
    [[Put]]被触发时，实际的行为取决于许多因素，包括对象中是否已经存在这个属性(这是最重要的因素)  

  - Getter和Setter  

    对象默认的[[Put]]和[[Get]]操作分别可以控制属性值的设置和获取  

    当一个属性定义getter、setter或者两者都有时，这个属性会被定义为"访问描述符"(和"数据描述符"相对)。  

    对于访问描述符来说，Javascript会忽略它们的value和writable特性，取而代之的是关心set和get(还有configurable和enumerable)特性。  

    会在对象中创建一个不包含值得属性，对于这个属性的访问会自动调用一个隐藏函数，它的返回值会被当作属性访问的返回值  
    ```
    var myObject = {
      // 给a定义一个getter
      get a() {
        return 2;
      }
    };
    
    myObject.a = 3;
    myObject.a; // 2
    ```  
    由于只定义了a的getter，所以对a的值进行设置时set操作会忽略赋值操作，不会抛出错误。而且即便有了合法的setter，由于自定义的getter只会返回2，所以set操作是没有意义的。

  - 存在性  

    属性访问返回值可能是undefined，但是这个值可能是属性中存储的undefined或者是属性不存在返回的undefined  

    可以在不访问属性值的情况下判断对象中是否存在这个属性：
    ```
    var myObject = {
         a: 2
    }

    ("a" in myObject); // true
    ("b" in myObject); // false

    myObject.hasOwnProperty("a"); // true
    myObject.hasOwnProperty("b"); // false
    ```
    in 操作符会检查属性是否在对象及其[[prototype]]原型链中  

    in 操作符实际上检查的是某个属性名是否存在  

    1. 枚举 --- p119-120  

- 遍历  

  for(...)  
  forEach(..)  
  every(..)  
  some(..)  
  for..of  