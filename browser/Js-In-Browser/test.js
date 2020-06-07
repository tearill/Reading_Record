// let bar = {
//   myName: " 极客邦 ",
//   test1: 1
// }
// function foo() {
//   this.myName = " 极客时间 "
// }
// foo.call(bar)
// console.log(bar)
// console.log(myName)

// let userInfo = {
//   name: "jack.ma",
//   age: 13,
//   sex: 'male',
//   updateInfo: function () {
//     let _this = this;
//     // 模拟 xmlhttprequest 请求延时
//     setTimeout(function () {
//       _this.name = "pony.ma"
//       _this.age = 39
//       _this.sex = 'female'
//       console.log(_this);
//     }, 2000);
//   }
// }
let userInfo = {
  name: "jack.ma",
  age: 13,
  sex: 'male',
  updateInfo: function () {
    // 模拟 xmlhttprequest 请求延时
    setTimeout(() => {
      this.name = "pony.ma"
      this.age = 39
      this.sex = 'female'
      console.log(this);
    }, 2000);
  }
}
// 通过 updateInfo 来更新 userInfo 里面的数据信息
userInfo.updateInfo()