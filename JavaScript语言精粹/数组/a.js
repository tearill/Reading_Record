var is_array = function(val) {
    return val && typeof(val) === 'object' && val.constructor === Array;
};
// 识别从不同的窗口(window)或帧(frame)里构造的数组时函数失效
console.log(is_array(['zero', 'one', 'two', 'shi', 'go']));




var is_array = function(val) {
    return Object.prototype.toString.apply(val) === '[object Array]';
};
// 更好的方法
console.log(is_array(['zero', 'one', 'two', 'shi', 'go']));