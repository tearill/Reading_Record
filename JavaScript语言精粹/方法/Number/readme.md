# Number 方法

- number.toExponential(fractionDigits)   

  把一个number转换成指数形式的字符串  

  fractionDigits 参数可选，控制其小数点后的数字位数，必须在0-20  


- number.toFixed(fractionDigits)  

  把一个number转换成一个十进制数形式的字符串  

  fractionDigits 参数可选，控制其小数点后的数字位数，必须在0-20，默认为0  

- number.toPrecesion(precision)  

  把一个number转换成一个十进制数形式的字符串  

  precision 参数可选，控制数字的精度

- number.toString(radix)  

  把一个number转换成字符串  

  radix 参数可选。规定表示数字的基数，是 2 ~ 36 之间的整数。若省略该参数，则使用基数 10。但是要注意，如果该参数是 10 以外的其他值，则 ECMAScript 标准允许实现返回任意值 
  - 2 - 数字以二进制值显示
  - 8 - 数字以八进制值显示
  - 16 - 数字以十六进制值显示