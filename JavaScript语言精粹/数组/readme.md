# 数组

- 数组字面量
  ```
  var empty = [];
  var numbers = ['', '', '',....];
  ```

- 长度  

  arr.length

- 删除  

  js中的数组是一个对象，可以用delete运算符从数组中移除元素
  ```
  numbers['zero', 'one', 'two', 'shi', 'go'];
  delete numbers[2]; -> ['zero', 'one', undefined, 'shi', 'go']
  ```
  - delete 运算符会在数组中留下空洞undefined
    - 使用splice()进行删除数组元素不会产生空洞，使得后面的元素依次替换前面的元素  

      splice(index, nums);  

      index: 删除开始位置的下表  

      nums: 删除元素的个数

- 枚举
  - for in   

    无法保证输出的顺序,并且会意外输出原型链的属性

- 容易混淆的地方  

  js没有一个好的机制来区分数组和对象  

  可以通过自定义is_array函数来弥补  -----见a.js  
  
  is_array函数在识别从不同的窗口(window)或帧(frame)里构造的数组时会失败，有更好的方法 -----见a.js

- 数组是一个对象，所以可以直接给数组添加方法

- js中没有多维数组，但是支持元素为数组的数组