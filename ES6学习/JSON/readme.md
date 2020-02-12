# ES6 中的JSON
1. JSON 对象  
   JSON.stringify() --- JSON 序列化，转字符串  
   JSON.parse() --- JSON 反序列化，转回JSON  
2. 简写  
   名字跟值(key 和 value)一样 --- 留一个就行  
   方法 --- :function一块删：  
   show: function() {...}  
   show() {...}

JSON 的标准写法：  
1. 只能用双引号  
2. 所有的名字都必须用引号包起来

{a: 12, b: 5} --- ×  
{"a": 12,, "b": 5} --- √