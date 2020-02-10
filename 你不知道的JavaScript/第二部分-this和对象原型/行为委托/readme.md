# 行为委托  

- 面向委托的设计  

  - 类理论 --- p165 

    传统面向类的设计方式  

  - 委托理论  

    定义一个Task对象，既不是类也不是含函数，它会包含所有任务都可以使用的具体行为，在需要的时候把特定对象关联到Task上，使用的时候进行委托  
    ```
    Task = {
        setTD: function(ID) { this.id = ID; }
        outputID: function() { console.log(this.id); }
    };

    // 让 XYZ 委托 Task 
    XYZ = Object.create(Task);

    XYZ.prepareTask = function(ID, Label) {
        this.setID(ID);
        this.label = Label;
    };

    XYZ.outputTaskDetails = function() {
        this.outputID();
        console.log(this.label);
    }

    // ABC = Object.create(Task);
    // ABC ... = ...
    ```
    Task 和 XYZ 并不是类(或者函数)，它们是对象。XYZ 通过 Object.create(...) 创建，它的 [[Protptype]] 委托了 Task 对象  

    `委托行为`意味着某些对象(XYZ)在找不到属性或者方法引用时会把这个请求委托给另一个对象(Task)

    在 API 接口的设计中，委托最好在内部实现，不要直接暴露出去  

    1. 相互委托(禁止) --- p168

    2. 调试 --- p168-169

  - 比较思维模型(两种设计模式的对比)  --- p170-173

    对象关联风格的代码更加简洁，因为这种代码只关注一件事：对象之间的关联关系

- 类与对象 --- p174-177  

  1. function Widget() {...}
     
     Widget.prototype.method = {...}

     function Button() {...}

     Button.prototype = Object.create( Widget.prototype )

     var btn1 = new Button(...)

  2. var Button = Object.create( Widget )

  - 更好的语法  
    ```
    class Foo() {
        methodName() { ... }
    }
    ```

  - 反词法  

    简洁方法去掉语法糖之后实际上使用的是匿名函数，产生缺点是自我引用(递归、事件(解除)绑定，等等)更难

- 内省 --- p185-187

  内省就是检查实例的类型。类实例的内省主要目的是通过创建方式来判断对象的结构和功能  

- 小结  

  类和继承、行为委托在JavaScript中是两种设计模式、代码组织方式

  行为委托认为对象之间是兄弟关系，相互委托，而不是父类和子类的关系。JavaScript的[[Protptype]]机制本质上就是行为委托机制



