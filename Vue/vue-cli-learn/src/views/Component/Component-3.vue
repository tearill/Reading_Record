<template>
  <div>
    <h1>组件插槽 slot</h1>
    <hr />
    <slot-demo title="这是标题">
      <!-- 默认插槽 default 也可以写成 slot="default"  -->
      <div>父组件内容</div>
      <!-- <button slot="btns">按钮</button> -->
      <template #btns>
        <button>按钮1</button>
        <button>按钮2</button>
      </template>
      <p slot="footer">foot</p>
    </slot-demo>
  </div>
</template>

<script>
import SlotDemo from "../../components/SlotDemo";
import MyComponent from "../../components/Component2.vue";
export default {
  name: "Component-3",
  data() {
    return {
      cur: "SlotDemo"
    };
  },
  components: {
    SlotDemo,
    MyComponent
  }
};
</script>

<style>
</style> 