# String 方法

- string.charAt(pos)  

  返回string中pos位置的字符，pos从0开始  
  
  charAt 实现 ---- 见charAt.js

- string.charCodeAt(pos)  

  返回string中pos位置的字符的字符码位  
  
  pos < 0 或 pos > string.length 时，返回NaN

- string.concat(string...)  

  把其他的字符串连接在一起来构成一个新的字符串

- string.indexOf(searchString, position)  

  在string内查找另一个字符串searchString  
  
  如果找到，返回第一个匹配字符的位置  
  
  未找到，返回-1  
  
  position 参数可选，可以设置从string的某个指定位置开始查找

- string.lastIndexOf(searchString, position)  

  和indexOf 相似，从字符串的末尾开始查找

- string.localeCompare(that)  

  比较两个字符串  
  
  如果string比字符串that小，返回负数  
  
  如果相等，返回0

- string.match(regexp)  

  让字符串和一个正则表达式进行匹配

- string.replace(searchValue, replaceValue)  

  对string进行查找和替换操作，并返回一个新的字符串  
  
  参数 searchValue 可以是一个字符串或者正则表达式对象

- string.search(regexp)  

  和indexOf方法类似，只是它接受一个正则表达式对象作为参数而不是一个字符串  
  
  它返回第一个匹配的首字符位置，如果没有找到匹配，返回-1  
  
  此方法会忽略正则的g标识，且没有position参数

- string.slice(start, end)  

  复制string的一部分来构造一个新的字符串 // 截取  
  
  end 参数可选，截取部分不包括end

- string.split(separator, limit)  

  把string分割成片段来创建一个字符串数组  
  
  separator 参数可以是一个字符串或一个正则表达式  
  
  limit 参数可选，可以限制被分割的片段数量

- string.substring(start, end)  

  与slice方法一样， 只是它不能处理负数参数

- string.toLowerCase()  

  将string中的所有字母转换成小写格式并返回

- string.toUpperCase()  

  将string中的所有字母转换成大写格式并返回

- String.fromCharCode(char...)  

  根据一串数字编码返回一个字符串  
  
  举个栗子：
  ```
  var a = String.fromCharCode(67, 97, 116)
  // a = 'Cat'
  ```
  