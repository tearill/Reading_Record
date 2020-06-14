// 什么是防抖和节流？有什么区别？如何实现？

// 防抖
// 在指定的时间内函数只会执行一次，如果指定时间内多次触发同一事件，则重新计算时间
// 事件指定时间内重复触发则删除原来的定时器，建立新的定时器
// 指定事件内无论触发多少次，我都只提交最后一次的触发
// 举例：提供一个按钮供你查询你未来对象的样子，无论你点击查询多少次，都只会在你最后一次点击之后查询
// 举例：王者荣耀的回城功能，反复触发回城，只会确认最后一次，从最后一次触发开始计时
//  场景：提交按钮、搜索词联想

// 定时器版本
function debounce_timer(fn, interval = 1000) {
  let timer = null;
  return function (...args) {
    let context = this;
    timer && clearTimeout(timer); // 如果已经触发了事件，再次触发的时候清空定时器
    timer = setTimeout(() => { // 定时器
      fn.apply(context, args); // 执行操作
    }, interval)
  }
}

// 时间计算版本
function debounce_date(fn, interval = 1000, immediate = true) {
  let last = Date.now();
  return function (...args) {
    let context = this;
    if (immediate) {
      fn.apply(context, args);
      immediate = false;
    } else if (Date.now() - last > interval) {
      fn.apply(context, args);
    }
    last = Date.now();
  }
}

// 节流
// 如果在规定的时间间隔内二次触发事件，不理睬二次触发的操作，必须等当前的定时器完成之后再去执行下一个
// 规定的时间内只会执行一次操作，如果触发多次，只有一次生效
// 举例：游戏里面的技能冷却，放了技能，进入冷却，期间就算不停地点技能，也放不了，只能等冷却好，才可以再放
// 场景：拖拽、resize、动画、滚动事件

// 定时器版本
function throttle_timer(fn, interval = 1000) {
  let flag = true;
  return function (...args) {
    let context = this;
    if (!flag) return; // 之前触发了，没有执行权限
    flag = false; // 一旦触发一次就锁定
    setTimeout(() => {
      fn.apply(context, args);
      flag = true; // 执行完了之后放开执行权限
    }, interval);
  }
}

// 时间计算版本
function throttle_date(fn, interval = 1000) {
  let last = 0;
  return function (...args) {
    let context = this;
    let now = +new Date();
    if (now - last < interval) return; // 规定时间内再次触发了
    last = now;
    fn.apply(context, args);
  }
}
