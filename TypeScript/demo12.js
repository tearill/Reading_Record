"use strict";
var myHusband = { sex: 'male', interest: 'reading', buy: true };
console.log(myHusband);
var mySearch;
mySearch = function (source, subString) {
    var flag = source.search(subString);
    return (flag != -1);
};
console.log(mySearch('高、富、帅、德', '胖'));
