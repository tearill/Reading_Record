const sqip = require('sqip');

const result = sqip({
  filename: './in.png',
  numberOfPrimitives: 10 // 效果值
});

console.log(result.final_svg);
