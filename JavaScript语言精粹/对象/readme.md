# 对象

- js的简单数据类型   

  数字  

  字符串  

  布尔值  

  null  

  undefined  

  其他所有的值都是对象 js中的对象是可变的键控集合 js中的对象是无类型的

- 对象的属性  

  writable  

  enumerable  

  configurable  

  value  

  get/set  
- 对象的标签  

  [[proto]]  

  [[class]]  

  [[extensible]]  

- 对象字面量  

  一个对象字面量就是包围再一对花括号中的零或多个"名/值对" 可以出现在任何允许表达式出现的地方  

  举个栗子：
  ```
  var stooge = {
      "first-name": "Jerome",
      "last-name": "Howard"
  }
  ```
  如果属性名是一个合法的js标识符不是保留字，不强制要求用引号括住属性名  

  例如: 用引号括住 "first-name"是必须的 因为first-name是不合法的  

        是否括住first_name是可选的 因为first_name是合法的  

  属性的值可以从包括另一个对象字面量在内的任意表达式中获得
  ```
  var flight = {
      airline: "Oceanic",
      number: 815,
      departure: {
          IATA: "SYD",
          time: "2004-09-22 14:55",
          city: "Sydney"
      }
  }
  ```
  - 补充：JSON 与 对象字面量区别:  

    json：JavaScript Object Notation        JavaScript 对象标记语言  

    在JavaScript 中，把所有的一切都看做对象。因此，任何支持的类型都可以通过 json 来表示，例如字符串、数字、对象、数组等。但是对象和数组是比较特殊且常用的两种类型：
    1. 对象表示为键值对
    2. 数据由逗号分隔
    3. 花括号保存对象
    4. 方括号保存数组
    ```
    //对象的字面量
    var o={
        name:"xiaoming",
        age:23,
        sex:"男",
        sayHi:function(){
            console.log("233333");
        }
    };
    
    //json写法：
    var o={
        "name":"xiaoming",
        "age":23,
        "sex":"男"
    };
    ```
    两者相似，json严格规范是因为它是描述数据的一种规范，json的写法和对象字面量写法类似，只是json键值要加引号

- 对象的检索  

  for in obj 会检索原型链 并且输出是无序的

- 原型  

  只有在检索值的时候才会去寻找原型链  

  原型连接在更新的时候不起作用

- 减少全局变量污染  

  全局变量削弱了程序的灵活性，应该避免使用  

  最小化使用全局变量的方法之一是只创建一个唯一的全局变量或者是放在window.onload中