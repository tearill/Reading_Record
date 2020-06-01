// a === b 的特例：+0 和 -0
console.log(1 / +0); // Infinity
console.log(1 / -0); // -Infinity
console.log(1 / +0 === 1 / -0); // false

//! JavaScript 采用 IEEE 754 标准浮点数表示法，最高位是符号位(0 代表正，1 代表负)，剩下的用于表示大小
//! 1000(-0) 和 0000(0)都是表示 0 
function eq(a, b) {
  if (a === b) return a !== 0 || 1 / a === 1 / b; // 对 +0 和 -0 进行处理
  return false;
}

console.log(eq(0, 0)); // true
console.log(eq(+0, -0)); // false

// 判断 NaN 和 NaN 相等
console.log(NaN === NaN); // false

// 利用 NaN 不等于自身的特性
function eq2(a, b) {
  if (a !== a) return b !== b; 
}

console.log(eq2(NaN, NaN)); // true
