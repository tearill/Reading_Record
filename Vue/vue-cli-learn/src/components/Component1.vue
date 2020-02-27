<template>
  <div>
    自定义组件 Componnet1
    <p>{{txt}}</p>
    <button @click="modify">修改</button>
    <p v-if="num">{{number}} - {{typeof num}}</p>
    <p v-if="obj">{{obj.a}} - {{obj.b}}</p>
    <p v-if="list">{{list.join('-')}}</p>
    <p>{{flag}}</p>
  </div>
</template>

<script>
export default {
  name: "MyComponent1",
  //   props: ["text", "num", "obj", "list", 'bool'],
  props: {
      text: {
          type: String,
          required: true,
          default: "默认的字符串"
      },
      num: {
          type: Number,
          // validator(val) {
          //     return val>100;
          // }
      },
      obj: {
          type: Object
      },
      list: {
          type: Array
      },
      bool: {
          type: Boolean
      }
  },
  data() {
    return {
      txt: this.text
    };
  },
  computed: {
    number() {
      return this.num + 1;
    },
    flag() {
      return this.bool ? "yes" : "no";
    }
  },
  methods: {
    modify() {
      this.txt = "modified data";
    }
  }
};
</script>

<style>
</style>