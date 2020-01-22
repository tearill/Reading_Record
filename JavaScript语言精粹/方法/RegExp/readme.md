# RegExp 方法

- regexp.exec(string)  

  exec方法是使用正则表达式的最强大(和最慢)的方法  

  匹配成功，返回一个数组，数组中下标为0的包含匹配到的字符串，下标为1的是分组1捕获的文本，下标为2的以此类推  

  匹配失败返回null

- regexp.test(string)  

  test方法是使用正则表达式最简单(和最快)的方法  
  
  匹配成功返回true  
  
  匹配失败返回false
