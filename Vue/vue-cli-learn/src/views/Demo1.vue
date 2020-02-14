<template>
  <div>
    <h1>事件修饰符</h1>
    <div class="demo" @click="fatherClick">
      父级元素
      <button class="demo" @click="subClick1">子元素1</button>
      <!-- stop 阻止冒泡修饰符 -->
      <button class="demo" @click.stop="subClick2">子元素2</button>
    </div>
    <hr />

    <!-- prevebt 阻止默认事件修饰符 -->
    <div @click.right.prevent="rightClick">点击右键</div>
    <a href="https://www.baidu.com/" @click.prevent="linkClick">百度</a>
    <hr />

    <!-- self 修饰符 -->
    <div class="demo" @click="fatherClick">
      父级元素
      <div class="demo inner" @click.self ="subClick2">
        子元素2
        <button @click="btnClick">按钮</button>
      </div>
    </div>
    <hr />

    <input type="text" @keydown.ctrl.v="ctrlEvent" />
    <hr />

    <input type="text" @keydown.space.prevent="spaceEvent" />
    <hr />

    <!-- capture 修饰符 -->
    <div class="demo" @click.capture="fatherClick">
      父级元素
      <button class="demo" @click="subClick1">子元素1</button>
      <button class="demo" @click="subClick2">子元素2</button>
    </div>
    <br />

    <!-- once 修饰符 -->
    <a href="https://www.baidu.com/" @click.prevent.once="linkClick">百度</a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    fatherClick() {
      console.log("父元素事件");
    },
    subClick1() {
      console.log("子元素1事件");
    },
    subClick2() {
      console.log("子元素2事件");
    },
    rightClick() {
      console.log("点击右键");
    },
    linkClick() {
      console.log("链接点击事件");
    },
    btnClick() {
      console.log('btn clicked');
    },
    ctrlEvent() {
      console.log("ctrl + v pressed");
    },
    spaceEvent() {
      console.log("prevent space");
    }
  }
};
</script>

<style>
.demo {
  border: 1px solid #000;
  background-color: greenyellow;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>