// const path = require('path');
import './styles/index.css'; // 依赖关系
import './styles/index.styl'; // css 预处理
import './styles/font.css'; // 字体

let $body = document.querySelector('body');

// 图片
let $imgWrapper = document.createElement('div');

let img = document.createElement('img');
// img.src = path.resolve(path.join(process.cwd(), 'imgs/avatar.jpg'));
img.src = require('./imgs/avatar.jpg');
// $imgWrapper.append(img);

let oneFrame = document.createElement('img');
// oneFrame.src = path.resolve(path.join(process.cwd(), 'imgs/oneFrame.png'));
oneFrame.src = require('./imgs/oneFrame.png');
$imgWrapper.append(oneFrame);

// $body.append($imgWrapper);

// 使用相应的字体
let body = document.querySelector('body');
let h1 = document.createElement('h1', null, '外部引入字体');
h1.innerText = '外部引入字体';
h1.className = 'iconfont font';
body.appendChild(h1);