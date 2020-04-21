// 变量的作用域，函数划分
function changeShape():void {
  var shape: string = '刘德华'
  console.log(shape)
}
changeShape()

// console.log(shape) // 直接报错 not defined

// 全局变量 局部变量
function changeShape2():void {
  var shape1: string = '刘德华'
  {
    let shape2: string = '小沈阳'
    console.log(shape2)
  }
  console.log(shape1)
  console.log(shape2)
}
changeShape2()