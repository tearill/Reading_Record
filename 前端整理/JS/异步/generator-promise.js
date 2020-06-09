// generator 和 Promise 结合使用
// 使用 Generator 函数管理流程，遇到异步操作的时候，通常返回一个 Promise 对象
function getFoo() {
  return new Promise((resolve, reject) => {
    resolve('foo');
  })
}

const g = function* () {
  try {
    const foo = yield getFoo();
    console.log(foo);
  } catch (err) {
    console.log(err);
  }
}

function generatorAutoRun(generator) {
  const it = generator(); // generator 函数

  function run(result) {
    if (result.done) return result.value; // 执行结束

    return result.value.then(function(value) {
      return run(it.next(value)); // value 作为 yield 的参数
    }, function(err) {
      return run(it.throw(err));
    })
  }

  run(it.next());
}

generatorAutoRun(g);
