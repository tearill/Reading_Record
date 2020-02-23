<template>
  <div class="cnt">
    <div class="contains">
      <div class="media-box__hd">
        <!-- 商品图片 -->
        <img class="media-box__thumb" src="https://img14.360buyimg.com/n0/jfs/t1/90693/18/4262/195395/5de5fb17E16893c43/2846343338ff5795.jpg" />
      </div>
      <div class="media-box__bd">
        <!-- 商品标题 -->
        <div class="media-box__title">嗨吃家酸辣粉110g*12桶整箱方便速食</div>
        <!-- 价格描述 -->
        <div class="media-box__price">59.90</div>
        <!-- 推荐时间 -->
        <!-- 右下角评论和推荐指数 -->
        <div class="media-box__sc">
          <div class="media-box__time">17:20</div>
          <div class="media-box__comment">
            <img class="comment_image" src="https://wx3.sinaimg.cn/mw690/beb0e147gy1gc69ok2uexj200w00wdfl.jpg" />
            <span class="comment_text">5</span>
          </div>  
          <div class="media-box__value">
            <img class="value_image" src="https://wx1.sinaimg.cn/mw690/beb0e147gy1gc69ok10thj200w00vgld.jpg" />
            <span class="value_text">100%</span>
          </div>          
        </div>
      </div>
    </div>
    <!-- 样式隐藏 -->
    <tabBar></tabBar>
  </div>
</template>

<script>
import tabBar from '../common/tabBar.vue'
export default {
    name: 'Index',
    components: {
        tabBar
    }
};
</script>

<style lang="less">
@import './style.less';
</style>