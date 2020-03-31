<template>
  <div class="cnt">
    <!-- 腾讯王卡 -->
    <!-- <img-box :imgs="imgs.header">
      <a href="" slot="link">Horace</a>
    </img-box> -->
    <div class="img_wrapper">
      <!-- {{index}} -->
      <div class="header_wrapper">
        <img-box :imgs="header_imgs">
          <a href="/apply" slot="apply_link" class="apply_link"></a>
        </img-box>
      </div>
      <div class="content_wrapper" v-for="(item, index) in index_imgs" :key="index">
        <img-box :imgs="item"></img-box>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ImgBox from '../common/ImgBox.vue'
import Web from 'reduce-loader!../common/Web.vue'
import 'reduce-loader!./web'

export default Vue.extend({
  name: 'Index',
  components: {
    Web,
    ImgBox
  },
  created() {
    if (process.env.isMiniprogram) {
      console.log('I am in miniprogram')
    } else {
      console.log('I am in Web')
    }
  },
  data() {
    return {
      header_imgs: ['http://wk.10010.com/images/mobile@content1.jpg'],
      index_imgs: {
        introduce: ['http://wk.10010.com/images/mobile@content2.jpg', 'http://wk.10010.com/images/mobile@content3.jpg', 'http://wk.10010.com/images/mobile@content4.jpg'],
        price_detail: ['http://wk.10010.com/images/mobile@content5.jpg', 'http://wk.10010.com/images/mobile@content6.jpg'],
        privilege: ['http://wk.10010.com/images/mobile@content7.jpg'],
        questions: ['http://wk.10010.com/images/mobile@content8.jpg', 'http://wk.10010.com/images/mobile@content9.jpg'],
        contact: ['http://wk.10010.com/images/mobile@content10.jpg']
      }
    }
  },
  methods: {},
})
</script>

<style lang="less">
@import '../style/reset.less';
</style>
