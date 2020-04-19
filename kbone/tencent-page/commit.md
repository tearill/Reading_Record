# Tencent-page  
使用 Kbone 尝试搭建一个腾讯王卡的页面，实现 Web 和小程序两端效果  
记录自己的详细提交记录和踩坑记录  
总结一点 Kbone 开发中的经验  

--------------------start--------------------  

- 第一次提交  
  网页总体结构设计  
  编写 rem.js 文件进行 rem 适配(页面宽度设计为750px)  
  修改网页 icon  
  抽象 ImgBox 组件，放置链接插槽  
  注意的点：  
  `<a>` 标签的放置和隐藏，放置要通过相对图片的绝对定位实现  
  图片拼接之后会有缝隙，解决方案：给最外层的元素加上和图片相同的背景色遮盖缝隙  
  [x]rem 适配 get  
  [x]首页设计 get  
  踩坑一：`<img>` 标签的样式写好之后在小程序端始终没有变化，一开始以为是 `<img>` 标签转换为小程序的 `<image>` 的组件的时候优先级除了问题，尝试给样式加 !important 页没有效果，调试了很久之后发现组件写样式的时候不能添加 scoped，不然在小程序端无法生效！！小程序不支持动态追加未声明的属性  
  踩坑二：图片一定要设置高度，不然展现的效果会不一样  