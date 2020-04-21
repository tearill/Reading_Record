"use strict";
private;
var Person1 = /** @class */ (function () {
    function Person1(sex, name, age) {
        this.sex = sex;
        this.name = name;
        this.age = age;
    }
    Person1.prototype.sayHello = function () {
        console.log('Hello');
    };
    Person1.prototype.sayLove = function () {
        console.log('I love you');
    };
    return Person1;
}());
var person1 = new Person1('male', 'Horace', 20);
console.log(person1.sex);
console.log(person1.name);
console.log(person1.age);
person1.sayHello();
person1.sayLove();
//! readonly
var Man = /** @class */ (function () {
    function Man() {
        this.sex = 'male';
    }
    return Man;
}());
var man = new Man();
man.sex = 'female';
