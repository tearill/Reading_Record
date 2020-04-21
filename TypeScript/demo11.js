"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//! 类的继承和重写 TypeScript 不支持多重继承
var HoraceClass = /** @class */ (function () {
    function HoraceClass(name, age, skill) {
        this.name = name;
        this.age = age;
        this.skill = skill;
    }
    HoraceClass.prototype.interest = function () {
        console.log('Find Someone');
    };
    return HoraceClass;
}());
var HoraceObj = new HoraceClass('Horace', 20, 'coding');
HoraceObj.interest();
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.shape = 'handsome';
        return _this;
    }
    Child.prototype.interest = function () {
        _super.prototype.interest.call(this);
        console.log('Build bussiness');
    };
    Child.prototype.makeMoney = function () {
        console.log('One billion per day');
    };
    return Child;
}(HoraceClass));
var child = new Child('Horace_child', 18, 'speech');
// console.log(child)
child.interest();
child.makeMoney();
