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
  radix 参数可选，控制基数，默认是10