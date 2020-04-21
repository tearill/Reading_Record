"use strict";
var age = NaN;
var stature = 178.5;
console.log(age);
console.log(stature);
console.log('----------------------');
var Horace = 'Horace ihorace.cn';
console.log(Horace);
// boolean true false
var b = true;
var c = false;
console.log(b, c);
console.log('----------------------');
// enum 类型 枚举，固定种类的
var HUMAN;
(function (HUMAN) {
    HUMAN["male"] = "\u7537";
    HUMAN["female"] = "\u5973";
    HUMAN["intersex"] = "\u4E2D\u6027";
})(HUMAN || (HUMAN = {}));
console.log(HUMAN.male); // 不赋值就是下标
console.log('----------------------');
// any 类型 经常切换类型
var t = 10;
t = "Horace";
t = true;
console.log(t);
console.log('----------------------');
// null 空白
