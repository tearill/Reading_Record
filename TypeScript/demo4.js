"use strict";
function search(age) {
    return '找到了' + age + '岁的小姐姐';
}
var age = 28;
var result = search(age);
// console.log(result)
// 有可选参数的函数
function searchNew(age, stature) {
    var yy = '';
    yy = '找到了' + age + '岁';
    if (stature != undefined) {
        yy = yy + stature;
    }
    return yy + '的小姐姐';
}
var resultNew = searchNew(22, '大长腿');
// console.log(resultNew)
// 有默认参数的函数
function searchDefault(age, stature) {
    if (age === void 0) { age = 18; }
    if (stature === void 0) { stature = '水蛇腰'; }
    var yy = '';
    yy = '找到了' + age + '岁';
    if (stature != undefined) {
        yy = yy + stature;
    }
    return yy + '的小姐姐';
}
var resultDefault = searchDefault(22, '大长腿');
// console.log(resultDefault)
// 有剩余参数的函数
function searchLeft() {
    var need = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        need[_i] = arguments[_i];
    }
    var yy = '找到了';
    for (var i = 0; i < need.length; i++) {
        yy += need[i];
        if (i < need.length - 1) {
            yy += '、';
        }
    }
    yy += '的小姐姐';
    return yy;
}
var resultLeft = searchLeft('22岁', '大长腿', '瓜子脸', '水蛇腰');
console.log(resultLeft);
