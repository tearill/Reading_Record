# Array 方法

- array.concat(item...)  

  产生一个新数组，它包含一份array的浅复制并把一个或多个参数item附加在其后  

  如果参数是一个数组，那么它的每个元素会被分别添加  

  举个栗子：
  ```
  var a = ['a', 'b', 'c'];
  var b = ['x', 'y', 'z'];
  var c = a.concat(b, true);
  // c = ['a', 'b', 'c', 'x', 'y', 'z', true]
  ```

- array.join(separator)  

  把一个数组构造成一个字符串  

  先把array中每个元素构造成一个字符串，接着用一个separator分隔符把它们连接在一起，默认的separator是逗号','  

  无间隔连接使用空字符串作为separator

- array.pop()  

  使数组可以像堆栈一样工作，pop方法移除array中最后一个元素并返回该元素  

  如果array是empty，它会返回undefined

- array.push(item...)  

  把一个或多个参数附加到一个数组的尾部  

  和concat方法不同的是，它会修改array  

  如果参数是一个数组，它会把参数数组作为单个元素整个添加到数组中，并返回这个array的新长度值  

  举个栗子：
  ```
  var a = ['a', 'b', 'c'];
  var b = ['x', 'y', 'z'];
  var c = a.push(b, true);
  // a = ['a', 'b', 'c', ['x', 'y', 'z'], true]  c = 5
  ```
  push 实现 ---- 见push.js

- array.reverse()  

  反转array里的元素顺序，并返回array本身

- array.shift()  

  移除数组array中的第一个元素并返回该元素  

  如果这个数组是空的，它会返回undefined  

  shif通常比pop慢得多  

  shift 实现 ---- 见shift.js

- array.unshift(item...)  

  和push方法类似，用于把元素添加到数组中，但是它把item插入到array的开始部分而不是尾部  

  它返回array的新的length  

  unshift 实现 ---- 见unshift.js

- array.slice(start, end)  

  对array中的一段做浅复制，首先复制array[start]，一直复制到array[end] //截取一段字符串  

  end 参数是可选的，默认是该数组的长度  

  如果两个参数中的任何一个是负数，array.length会和它相加，试图让它成为非负数  

  如果start大于等于array.length，得到的记过将会是一个新的空数组  


- array.sort(cpmparefn)  

  对array内容进行排序，可以使用自己的比较函数来替换默认的比较函数  

  举个栗子：  
  ```
  var n = [4, 8, 15, 16, 23, 42];
  n.sort(function(a, b) { return a-b; })
  ```

- array.splice(start, deleteCount, item...)  

  从数组中移除一个或多个元素，并用新的item替换它们  
  
  item 参数可选，替换位置从start开始  
  
  start 移除开始位置下标  
  