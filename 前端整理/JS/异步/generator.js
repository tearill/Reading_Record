function* foo(x) {
  let y = yield(x + 1);
  console.log(y);
  let z = yield(y / 2);
  console.log(z);
  return ( x + y + z );
}

let test = foo(5);
// console.log(test);
let val1 = test.next();
console.log(val1);
console.log(test.next(val1.value));
console.log(test.next(val1.value));

function* foo2(x) {
  let y = 2 * (yield(x + 1));
  let z = yield(y / 3);
  return (x + y + z);
}
let it = foo2(5);
console.log(it.next()); // { value: 6, done: false }
console.log(it.next(12)); // { value: 8, done: false }
console.log(it.next(13)); // { value: 42, done: true }
// 1. let it = foo(5)  
// 2. 第一次调用 it.next() 函数停在第一个 yield(x + 1)，所以返回值为 5 + 1 = 6  
// 3. 第二次调用 it.next(12)，next 中的参数 12 被当作上一个 yield 的返回值，所以 y = 2 * 12 = 24，函数会停在第二个 yield(y / 2)，返回值为 24 / 3 = 8  
// 4. 第三次调用 it.next(13)，next 中的参数 13 被当作上一个 yield 的返回值，**此时 x = 5, y = 24, z = 13**  
// 5. 最后 return(x + y + z)，结果为 5 + 24 + 13 = 42  
