const lqip = require('lqip');
const file = './in.png';

// 先显示原图 10% 左右的轮廓，lazyload 加载完成后替换原来的 src 放上去
lqip
  .base64(file) // 生成 base64(轮廓的 base64)
  .then(res => {
    console.log(res)
  });

// 核心像素色值
lqip
  .palette(file)
  .then(res => {
    console.log(res);
  });
