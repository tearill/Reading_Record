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

   3. Array.from --- 将来源转换成真正的数组(类似数组的对象，可遍历的对象)
      * 常见的将类数组转换成数组的方法：  
        i. Array.from  
        ii. 展开运算符 ...   
           `list = [...list]`  
      * 三个参数：
        i. 需要转换的类数组  
        ii. 需要给转换后的每项执行的方法，和 map 方法类似  
        iii. thisArg --- 用来改变 this 指向(第二个参数必须使用 funciton，不能使用箭头函数)

   4. Array.isArray --- 检测数据是否是数组

   5. Array.of --- 将一组值，转换为数组  
      ```
      function ArrayOf() {
         return [].slice.call(arguments);
      }
      ```

   6. find / findIndex --- 找出第一个符合条件的数组成员  
      * 参数：  
        i. 回调函数 (element, [index], [array])  
        ii. thisArg --- 用来绑定回调函数的 this 对象
      * 所有数组成员依次执行该回调函数，直到找出第一个返回值为 true 的成员(find)/下标(findIndex)  

   7. flat --- 数组扁平化(数组降维)  
      * 参数：  
        depth --- 指定拉平的层数，默认是 1，参数可选  
      * 技巧：  
        如果不知道数组层级，可以直接给参数 Infinity，全部拉平

   8. flatMap --- 数组扁平化并且给转换之后的数组执行一个回调函数  

   9. fill --- 填充数组(默认填充整个数组)  
      * 参数：  
        i. 用于填充的元素  
        ii. 填充的起始位置  
        iii. 填充的结束位置  
      