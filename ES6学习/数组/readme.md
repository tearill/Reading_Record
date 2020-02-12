# ES6 中的数组
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