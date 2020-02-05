# 混合对象"类"  

- 类理论 --- p126  
  类、实例化、继承、多态

- "类"设计模式 --- p127  
  如：迭代器模式、观察者模式、工厂模式、单例模式等  

- 建造 --- p129  

- 构造函数  
  
  类实例由特殊的类方法构造，方法名通常和类名相同，称为构造函数，任务是初始化实例需要的所有信息(状态)  

- 类的继承  

  inherts关键字实现类的继承  

- 多态  

  子类覆盖重写父类的属性和方法  

  多态的另一个方面是，在继承链的不同层次中一个方法名可以被定义多次，当调用方法时会自动选择合适的定义  

  子类对继承到的方法进行重写，不会影响父类的方法。  

  多态并不代表子类和父类有关联，子类得到的只是父类的一份副本，类的继承其实就是复制。   

- 多重继承  --- p134
  JavaScript本身并不提供"多重继承"功能  

- 混入  

  模拟类的复制行为  

  - 显式混入  
    由于Javascript不会自动实现父类到子类的复制行为，所以我们需要手动实现复制功能。  
    ```
    // 非常简单的mixin(..)例子
    function mixin(sourceObj, targetObj) {
        for (var key in sorceObj) {
            // 只会在不存在的情况下复制
            if(!key in sourceObj) {
                targetObj[key] = sourceObj[key];
            }
        }

        return targetObj;
    }

    var Vehicle = {
        engines: 1,

        ignition: function() {
            consol.log("Turning on my engine.");
        }

        drive: function() {
            this.ignition();
            console.log("Steering and moving forward!");
        }
    };

    var Car = mixin(Vehicle, {
        wheels: 4,

        drive: function() {
            Vehicle.drive.call(this);
            console.log("Rolling on all" + this.wheels + "wheels!");
        }
    });
    ```
    从技术角度来说，函数实际上并没有被复制，复制的是函数引用。所以，Car中的属性ignition只是从Vehicle中复制过来的对于ignition()函数的引用。相反，属性engines就是直接从Vehicle中复制了值 1  

    1. 再说多态  
       Vehicle.drive.call(this); 就是显式多态  
    2. 混合复制  
       JavaScript中的函数无法(用标准、可靠的方法)真正的复制，所有只能复制对共享函数对象的引用(函数就是对象)。如果修改了共享的函数对象(比如ignition())，比如添加了一个属性，那Vehicle和Car都会收到影响  
    3. 寄生继承  
       显式混入迷失的一种变体被称为"寄生继承"，它既是显式的又是隐式的。  
       ```
       // "传统的JavaScript类" Vehicle
       function Vehicle() {
           this.engines = 1;
       }
       Vehicle.prototype.ignition = function() {
           console.log("Turning on my engine.");
       };
       Vehicle.prototype.drive = function() {
           this.ignition();
           console.log("Steering and moving forward!");
       };

       // "寄生类" Car
       funciton Car() {
           // 首先，car是一个Vehicle
           var car = new Vehicle();

           // 接着对car进行复制
           car.wheels = 4;

           // 保存到Vehicle::drive()的特殊引用
           var vehDrive = car.drive;

           // 重写Vehicle::drive
           car.drive = function() {
               vehDrive.call(this);
               console.log("Rolling on all" + this.wheels + "wheels!");
           }
           return car;
       }

       var myCar = new Car();

       myCar.drive();
       // Turning on my engine.
       // Steering and moving forward!
       // Rolling on all 4 wheels!
       ```

  - 隐式混入  
    ```
    var Something = {
        cool: function() {
            this.greeting = "Hello World";
            this.count = this.count ? this.count + 1 : 1;
        }
    };

    Something.cool();
    Something.greeting; // Hello World
    Something.count; // 1

    var Another = {
        cool: function() {
            // 隐式把Something混入Another
            Something.cool.call(this);
        }
    };

    Another.cool();
    Another.greeting; // Hello World
    Another.count; // 1 (count不是共享状态)
    ```
    通过在构造函数调用或者方法调用中使用Something.cool.call(this)，我们实际上"借用"了函数Something.cool()并在Another的上下文中调用了它(通过this绑定)，最终的结果是Something.cool()中的赋值操作都会应用在Another对象上而不是Something对象上。  

- 小结  

  类是一种设计模式  

  类意味着复制  

  多态(在继承链的不同层次名称相同但是功能不同的函数)，本质上引用的其实是复制的结果  

  混入模式(无论是显式还是隐式)可以用来模拟类的复制行为