// 实现一个 type 函数检测各种类型的值
// 基本类型使用 typeof
// 引用类型使用 Object.prototype.toString()

let class2Type = {};

// 生成类型映射表 (忽略 Math 和 JSON)
"Boolean Number String Function Array Date RegExp Object Error Null Undefined"
  .split(' ')
  .map((item, index) => {
    class2Type['[object ' + item + ']'] = item.toLowerCase();
  })

// console.log(class2Type);
// { '[object Boolean]': 'boolean',
//   '[object Number]': 'number',
//   '[object String]': 'string',
//   '[object Function]': 'function',
//   '[object Array]': 'array',
//   '[object Date]': 'date',
//   '[object RegExp]': 'regexp',
//   '[object Object]': 'object',
//   '[object Error]': 'error',
//   '[object Null]': 'null',
//   '[object Undefined]': 'undefined' }

// typeof 判断为 object 或 function 的采用 Object.prototype.toString 根据映射表判断
// 否则采用 typeof 进行判断
function type(obj) {
  //! 兼容 IE6 中 null 和 undefined 会被 Object.prototype.toString 识别成 [object Object]
  if (obj == null) { // null == null | undefined == null
    return obj + ''; // 转成相应的类型字符串
  }

  return typeof obj === 'object' || typeof obj === 'function' ?
    class2Type[Object.prototype.toString.call(obj)] || 'object' :
    typeof obj;
}

console.log(type(null));
console.log(type(undefined));

// 封装
function isFunction(obj) {
  return type(obj) === 'function';
}

let isArray = Array.isArray || function(obj) {
  return type(obj) === 'array';
}

function fun() {}
console.log(isFunction(fun));
