<template>
  <div>
    <input type="text" v-model="n1" />

    <select v-model="opt">
      <option value="+">+</option>
      <option value="-">-</option>
      <option value="*">*</option>
      <option value="/">/</option>
    </select>

    <input type="text" v-model="n2" />

    <input type="button" value="=" @click="calculate" />

    <input type="text" v-model="result" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      n1: "",
      n2: "",
      result: "",
      opt: "+"
    };
  },
  methods: {
    calculate() {
      //   switch (this.opt) {
      //     case "+":
      //       this.result = parseInt(this.n1) + parseInt(this.n2);
      //       break;
      //     case "-":
      //       this.result = parseInt(this.n1) - parseInt(this.n2);
      //       break;
      //     case "*":
      //       this.result = parseInt(this.n1) * parseInt(this.n2);
      //       break;
      //     case "/":
      //       this.result = parseInt(this.n1) / parseInt(this.n2);
      //       break;
      //     default:
      //       break;
      //   }
      var codeStr = 'parseInt(this.n1)' + this.opt + 'parseInt(this.n2)';
      this.result = eval(codeStr);
    }
  }
};
</script>

<style>
div {
  height: 55px;
}

input,
select {
  margin-right: 5px;
}
</style>