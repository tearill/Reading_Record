function foo() {
    var a = 2;
    // var printer = function() {
    //     return a;
    // }
    // return {
    //     printer: printer
    // }
    bar()
}

function bar() {
    console.log(this.a)
}

foo()