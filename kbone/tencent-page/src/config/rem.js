// rem 手动的计算  

(function (doc, win) {
  // 不会污染外界  
  // 计算 html font-size width/16
  var docEl = doc.documentElement, // 整个 html 文档
    resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
    recalc = function () {
      // 设备无差异计算出 16rem = 100% width 
      var clientWidth = docEl.clientWidth; // 整个窗口的宽度
      console.log(clientWidth);
      if (!clientWidth) return;
      docEl.style.fontSize = 23.4375 * (clientWidth / 375) + 'px';
      // 设备可能从横向变为纵向 或者屏幕尺寸大小发生改变
      win.addEventListener(resizeEvt, recalc, false);
    };
  // false 冒泡 --- 从内向外执行
  // true 捕获 --- 从外向内执行
  doc.addEventListener('DOMContentLoaded', recalc, false);
  // docEl.style.fontSize = '23.5px';
})(document, window) // 闭包 立即执行 实参