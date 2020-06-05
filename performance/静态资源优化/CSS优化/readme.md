# CSS 的优化

## 提升 CSS 渲染性能

- 谨慎使用 expensive 属性
  - 比如 nth-child 选择器、position: fiexed 定位
- 尽量减少样式层级数量（减少 CSS 查询，可以用 class）
  - 例如 div ul li span i { color: yellow; }
- 尽量避免使用占用过多 CPU 和内存的属性
  - 例如 text-indent: -99999px;
- 尽量避免使用耗电量大的属性
  - 例如 transform、transition、opacity

## 合理使用 CSS 选择器

- 尽量避免使用 CSS 表达式
  - 例如 background-color: expression((new Date()).getHours()%2 ? "#fff" : "#000");
- 尽量避免使用通配符选择器
  - 例如 body > a { font-weight: bold; }
- 尽量避免类正则的属性选择器
  - 例如：*=、|=、^=、$=

## 提升 CSS 文件加载性能

- 使用外联的 CSS（可以用 CDN）
- 尽量避免使用 @import
  - import 是在 CSS 中的，整个 CSS 加载完之后需要把 import 依赖的文件全部加载完成才能继续渲染
  - 阻塞 CSS 文件的加载，影响其他 JS 文件的加载

## 精简 CSS 代码

- 使用缩写语句，例如 margin-top 和 margin-bottom 合并到 margin 中
- 删除不必要的零，例如 0.2 em => .2em
- 删除不必要的单位，例如 px，margin-top: 0;
- 删除过多的分号
- 删除空格和注释
- 尽量减小样式表的大小

## 合理使用 Web Fonts

- 将字体部署在 CDN 上，加快字体的加载
- 将字体以 base64 形式保存在 CSS 中并通过 localStorage 进行缓存
- 某些字体库应使用国内托管服务

## CSS 动画优化

- 避免同时使用动画，同一屏幕区间内不要有过多动画，动画过多也会打乱用户预览、影响浏览器的性能
- 延迟动画初始化，保证其他 CSS 样式渲染
- 结合 SVG

