"use strict";
// 变量的作用域，函数划分
function changeShape() {
    var shape = '刘德华';
    console.log(shape);
}
changeShape();
// console.log(shape) // 直接报错 not defined
// 全局变量 局部变量
function changeShape2() {
    var shape1 = '刘德华';
    {
        var shape2 = '小沈阳';
        console.log(shape2);
    }
    console.log(shape1);
    console.log(shape2);
}
changeShape2();
