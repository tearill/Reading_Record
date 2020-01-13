var myMammal = {
    name: 'Herb the Mammal',
    get_name: function() {
        return this.name;
    },
    says: function() {
        return this.saying || '';
    }
};

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function(n) {
    var i, s = '';
    for(i = 0; i < n; i += 1) {
        if(s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function() {
    return this.says() + ' ' + this.name + ' ' + this.says();
};

console.log(myCat.get_name());

var mammal = function(spec) { // 实现name和saying属性完全私有化 只有通过get_name和says两个特权方法才可以访问
    var that = {}; 
    that.get_name = function() {
        return spec.name;
    };
    that.says = function() {
        return spec.saying;
    };

    return that;
};

var myMammal = mammal({name: 'Herb'}); 
// console.log(myMammal.says());
console.log(myMammal.get_name());

var cat = function(spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec); // 调用mammal
    that.purr = function(n) {
        var i, s = '';
        for(i = 0; i < n; i += 1) {
            if(s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function() {
        return this.says() + ' ' + spec.name + ' ' + this.says();
    };
    return that;
};

var myCat = cat({name: 'Henrietta'});

console.log(myCat.get_name());

Object.method('superior', function(name) {
    var that = this,
        method = that[name];
    return function() {
        return method.apply(that, arguments);
    };
});

var coolcat = function(spec) {
    var that = cat(spec),
        super_get_name = that.superior('getname');
    that.get_name = function(n) {
        return 'like' + super_get_name() + ' baby';
    };
    return that;
};
var myCoolCat = coolcat({name: 'Bix'});
var name = myCoolCat.get_name();
console.log(name);