// 实现一个简单版 Promise
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function myPromise(fn) {
  const _this = this;
  _this.value = null; // 传递给 resolve 或 reject 使用的值
  _this.state = PENDING; // Promise 初始状态为 pending
  _this.resolvedCallbacks = []; // then 中的 resolve 回调
  _this.rejectedCallbacks = []; // then 中的 reject 回调

  function resolve(value) {
    if (_this.state === PENDING) {
      _this.state = FULFILLED;
      _this.value = value;
      _this.resolvedCallbacks.map(cb => cb(_this.value)); // 执行所有的 resolve 回调
    }
  }

  function reject(value) {
    if (_this.state === PENDING) {
      _this.state = REJECTED;
      _this.value = value;
      _this.rejectedCallbacks.map(cb => cb(_this.value));
    }
  }

  fn(resolve, reject);
}

myPromise.prototype.then = function(onFulfilled, onRejected) {
  const _this = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

  if (_this.state === PENDING) { // 注册 resolve 和 reject 回调
    _this.resolvedCallbacks.push(onFulfilled);
    _this.rejectedCallbacks.push(onRejected);
  }

  _this.state === FULFILLED && onFulfilled(_this.value);

  _this.state === REJECTED && onRejected(_this.value);
}

new myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 0)
}).then(value => {
  console.log(value)
})
