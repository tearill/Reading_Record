# ES6 中的数组
- ES5 中的一些比较好用的数组方法：
  1. map --- 映射 --- 一个对一个  
      [12, 58, 99, 86, 45, 91]  
      [不及格, 不及格, 及格, 及格, 不及格, 及格]  

      [45, 57, 135, 28]  
      [
         {name: 'blue', level: 0, role: 0},
         {name: 'zhangsan', level: 99, role: 3},
         {name: 'aaa', level: 0, role: 0},
         {name: 'bbb', level: 0, role: 0},
      ]
   
   2. reduce --- 汇总 --- 一堆出来一个  
      
      arr.reduce((tmp, item, index) => {})  
      tmp：中间结果(头一次是arr[0])  
      item： 数组的值  
      index：下标

      算个总数：  
      [12, 800000, 599999] => 1400011  

      算个平均数：  
      [12, 59, 99] => 56.67  

   3. filter --- 过滤器 --- 留一部分，消失一部分  
      
   4. forEach --- 循环(迭代)  

- ES6 中新增的数组方法：

   1. includes --- 是否包含某个东西  

   2. keys/values/entries 

      |     方法      |        数组       |     json      |  
      | ------------- | ---------------- | ------------- |
      | for i in ...  | 循环的是值(key)   |  循环的是key   |
      | for i of ...  | 循环的是值(value) |       x       |

      json 对象不可迭代，不能使用 for ... in 

      keys => 所有的 key 拿出来 --- 0, 1, 2, 3, ....  
      values => 所有的 value 拿出来 --- 12, 6, 8, ....  
      entries => 所有的 key-value 对拿出来 --- {key: 0, value: 12}

   3. Array.from --- 将来源转换成数组(类似数组的对象，可遍历的对象)  

   4. Array.of --- 将一组值，转换为数组