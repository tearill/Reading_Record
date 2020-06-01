// eq 函数
// 用来过滤掉简单的类型比较，复杂的对象使用 deepEq 函数进行处理

function eq(a, b) {
  // 区分 +0 和 -0
  if (a === b) return a !== 0 || 1 / a === 1 / b;

  // 有 null 的情况提前退出
  if (a == null || b == null) return false;

  // 判断 NaN
  if (a !== a) return b !== b;

  // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
  let type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false;

  // 复杂对象使用 deepEq 处理
  return deepEq(a, b);
}

// String 对象
let toString = Object.prototype.toString;
toString.call('Curly'); // "[object String]"
toString.call(new String('Curly')); // "[object String]"
console.log('Curly' + '' === new String('Curly') + '', 'string'); // true

// Boolean
let a = true;
let b = new Boolean(true);
console.log(+a === +b, 'boolean'); // true

// Date
let dateA = new Date(2020, 6, 1);
let dateB = new Date(2020, 6, 1);
console.log(+dateA === +dateB, 'date'); // true

// RegExp
let regA = /a/i;
let regB = new RegExp(/a/i);
console.log('' + a === '' + b, 'RegExp'); // true

// Number
let numA = Number(NaN);
let numB = Number(NaN);
console.log(+numA === +numB, 'Number'); // false
console.log(+numA !== +numA && +numB !== numB, 'Number') // true
// 将 if (a !== a) return b !== b; 变为 => if (+a !== +a) return +b !== +b;

function deepEq(a, b) {
  let className = toString.call(a);
  if (className !== toString.call(b)) return false;

  switch(className) {
    case '[object String]':
    case '[object RegExp]':
      // 使用 '' 隐式转换
      return '' + a === '' + b;
    case '[object Boolean]':
    case '[object Date]':
      // 使用 + 转换数字
      return +a === +b;
    case '[object Number]':
      // 判断 NaN
      if (+a !== !a) return +b !== +b;
  }
}
