<template>
  <div class="apply_box">
    <div class="top_img_wrapper">
      <img-box :imgs="header_imgs"></img-box>
    </div>
    <div class="free_flow">
      <img-box :imgs="free_flow_imgs"></img-box>
    </div>
    <div class="free_flow_detail">
      <img-box :imgs="free_flow_detail"></img-box>
    </div>
    <map name="planetmap1" id="planetmap1"> 
      <area id="area1" shape="rect" coords="250.63359999999997,110.55893333333333,356.18986666666666,124.56639999999999" href="/home"> 
    </map>
  </div>
</template>

<script>
import ImgBox from '../common/ImgBox.vue'

export default {
  name: 'Apply',
  props: [],
  data() {
    return {
      header_imgs: ['https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_top_01.jpg?94183f5ed19b5c2362bc4e7b618ef4d5',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_top_02.jpg?5b55d199c3319ae761092dab20f36747',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_top_03.jpg?d9cfce683a691a101c58e0f569c35864'],
      free_flow_imgs: ['https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_01.jpg?0e45950f32dec756136b404eba4bc66f',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_02.jpg?d41f4a6016367326daeb72f57c88db86',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_03.jpg?8ed1eb91ae899e298b3bd1c36d0dac65',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_04.jpg?1cd222b01a66e450e0b724907474b302',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_05.jpg?ce0bee6afb829f340946d4baf322a546',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_06.jpg?aba799a53bde8fa12aed487b95c2b530',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_07.jpg?1dc5ff2fb9fea39f31482fe6c0554618',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_08.jpg?6dde4ca43f9ea9865ee774c686edc81a',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_09.jpg?37375f6c396e47a344acf034f82ad95f',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_10.jpg?4910206266aba9dce3be4cd3a63828c1',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_11.jpg?7e308ed2bb2e053db58ed081aef14b35',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_12.jpg?f0854d336df3c4d7d6db541352a39bd2'],
      free_flow_detail: ['https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_13.jpg?7d421d75805b631e3fc166b02d27e947',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/godking_tab_desc_14.jpg?4c53c0497807470787055e203e33b280'],
      top_speed_imgs: ['https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_01.jpg?621c79c8a4431ba15ecbc86635357ecf',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_02.jpg?9e0de67a4f37ffea960a23cf14ea4ea5',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_03.jpg?1d16958828e4a8496d4c5e665e32744e',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_04.jpg?579714811e01ad32e8aeee15009e2610',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_05.jpg?811852bcd8668ca26f99dd3f10337287',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_06.jpg?f65e544a0cae65d12dad0acd152681f5',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_07.jpg?ed3a2254e8d946a3928172aeb080d2f2',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_08.jpg?11dfa8707f924eb74bdc49f19bcc5813',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_09.jpg?774dc71c1d0e84160189f469922fcb36',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_10.jpg?999a8a7a02411c0fd6c27a62cb88046a',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_11.jpg?f78b7c087cb373d329138b64420ccb37',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_12.jpg?b89e17ad6ead4549ed333a68900b3e12',
        'https://res.mall.10010.cn/mall/wow/static/images/tencent/head-card/images/js_tab_desc_13.jpg?09aa95400a1c17647e46a65db3f88ce1']
    }
  },
  components: {
    ImgBox
  }
}
</script>

<style lang="less">
@import '../style/reset.less';
.apply_box {
  position: relative;
  color: #666;
  min-height: 100%;
  padding-bottom: 6.25rem;
  background-color: #1a1d45;
  map {
    display: inline;
    .area1 {
      outline: none;
      cursor: pointer;
      display: inline;
    }
  }
}
</style>
