// CommonJS

// 引入依赖
var store = require('store');
// exports
exports = function() {
  return store.get('customers');
}

// NodeJS module
// 引入依赖
var store = require('store');
function customersFn() {
  return store.get('customers');
}
// exports
module.exports = customersFn;

// RequireJS
// 先引入基础依赖文件
// <script data-min="script/main" src="scripts/require.js"></script>

// SeaJS
// 方式一
define(function(require, exports, module) {
  // 模块代码
});

// 方式二
define('module', ['module1', 'module2'], function(require, exports, module) {
  // 模块代码
});

// ES6 module
// square.js
export function square(x) {
  return x * x;
}

// main.js
import { square } from 'square';
console.log(square(10));
