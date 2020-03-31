<template>
  <div class="img_box">
    <section v-for="(item, index) in imgs" :key="index">
      <img :src="item" alt="">
    </section>
    <slot name="apply_link"></slot>
  </div>
</template>

<script>
export default {
  name: 'ImgBox',
  props: ['imgs']
}
</script>

<style lang="less">
@import '../style/reset.less';
.img_box {
  position: relative;
  width: 100%;
  // height: auto;
  img {
    display: block;
    width: 100%;
    height: auto;
    pointer-events: none;
  }
  .apply_link {
    text-align: center;
    position: absolute;
    top: 63%;
    // top: 7rem;
    left: 37%;
    display: block;
    width: 26%;
    height: 15%;
    // background-color: red;
    opacity: 0;
    text-decoration: none;
  }
}
</style>
