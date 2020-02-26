<template>
  <div>
    <h1>computed && watch 1</h1>
    <!-- 表达式太复杂的话会导致模板难以维护，而且如果多个地方使用该表达式的话会导致重复 -->
    <div>{{type + ":" + msg}}</div>
    <!-- 使用 computed 计算属性优化 -->
    <div>{{type_msg}}</div>
    <div>{{firstName}}</div>
    <div>{{lastName}}</div>
    <div>computed: {{fullName}}</div>
    <button @click="modifyFirstName">修改firstName</button>

    <button @click="modifyLastName">修改lastName</button>

    <button @click="modifyFullName">修改fullName</button>

    <!-- 通过函数的方式达到计算属性的效果 -->
    <div>function: {{getFullName()}}</div>

    <hr />

    <div>语言：{{language}}</div>
    <button @click="switchLanguage('ch')">中文</button>
    <button @click="switchLanguage('en')">English</button>
    <div>{{zhangsan}}</div>
    <div>{{lisi}}</div>
  </div>
</template>

<script>
export default {
  name: "computed",
  data() {
    return {
      type: "computed",
      msg: "news",
      firstName: "张",
      lastName: "无极",
      language: "ch",
      zhangsan: "",
      lisi: ""
    };
  },
  computed: {
    type_msg() {
      return this.type + ":" + this.msg;
    },
    // fullName() {
    //     return this.firstName + this.lastName;
    // }
    fullName: {
      get() {
        return this.firstName + this.lastName;
      },
      set(newVal) {
        let arr = newVal.split(" ");
        this.firstName = arr[0];
        this.lastName = arr[1];
      }
    }
  },
  watch: {
    language: {
      handler(newVal) {
        if (newVal === "ch") {
          this.zhangsan = "张三";
          this.lisi = "李四";
        } else if ((newVal = "en")) {
          this.zhangsan = "zhangsan";
          this.lisi = "lisi";
        }
      },
      immediate: true
    }
  },
  methods: {
    getFullName() {
      return this.firstName + this.lastName;
    },
    modifyFullName() {
      this.fullName = "Michel Jordan";
    },
    modifyFirstName() {
      this.firstName = "欧阳";
    },
    modifyLastName() {
      this.lastName = "修";
    },
    switchLanguage(val) {
      this.language = val;
    }
  }
};
</script>

<style>
</style>