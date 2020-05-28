# TypeScript  
TypeScript JavaScript 超集 编程语言 静态类型和面向对象  
大型应用、多人协作  

### TypeScript VS JavaScript：  

1. 应用程序
2. 是 JS 的超集，最终编译成 JS (less、sass -> css)
3. 跨平台，且开源
4. 开始于 JS，终止于 JS
5. 重用 JS，甚至可以引入 JS 流行的库
6. TypeScipt 提供类、接口、模块

### TypeScript 中对应 JS 的原始数据类型  

- number
- string
- boolean
- null
- undefined
- void
- symbol
- bigint

- TS 类型侧的定义 
  TS 中常见的非原始类型 

  - array：数组类型
  - tuple：元组类型，允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
  - enum：枚举类型

- TS 的特殊类型 - any、unknown、never

  - any：任意类型，一个牛逼的类型

    主要用于在编码的时候不知道一个变量的类型，所以先给它加一个 `any` 类型定义，表示它可以是任何类型，一般留待后续确认此变量类型之后再将 `any` 改为具体的类型

  - unknown：和 `any` 类型一样都可以表示任何类型，但相比于 `any` 类型更加的安全

    举个栗子：

    ```js
    let str1: any
    let str2: unknown
    ```

    当不清楚具体类型但又要继续开发的时候 `any` 和 `unknown` 类型都可以用，但是在使用的时候，`any` 类型的变量可以任意进行赋值、实例化、函数执行等操作，但是 `unknown` 类型只允许赋值，不允许实例化、函数执行等操作

    例如：

    ```js
    str1 = 'Horace'
    str2 = "I'm Horace"
    
    str1.foo.bar() // 可行
    str2.foo.bar() // 报错
    ```

  - never：代表不存在的值类型

    一般用于给函数进行类型声明，函数绝不会有返回值的时候使用，比如函数内抛出错误

    举个栗子：

    ```js
    function responseError(message) {
      // ... 具体操作，接收信息，抛出错误
    }
    ```

    函数体内根据 `message` 抛出对应的错误

    ```js
    function responseError(message: string): never {
      // ... 具体操作，接收信息，抛出错误
    }
    ```

### 枚举和接口

- Interface

  相当于类型中的 JS 对象，用于对函数、类等进行结构类型检查，，所谓的结构类型检查，就是两个类型的结构一样，那么它们的类型就是兼容的，这在计算机科学的世界里也被成为 “鸭子类型”。

- 可选属性

  只需要在属性类型修饰冒号左边加一个问号就可以了

- 只读属性

  TS 的 Interface 还有一些额外的属性比如只读属性（readonly），表示用相关带有只读属性的接口对某个 JS 元素做类型注解的时候，这个 JS 元素相关的属性被注解为只读属性时，之后不可以修改这个属性

  ```typescript
  interface Todo {
    content: string;
    readonly user: string; // 只读
    time?: string; // 可选
    isCompleted: boolean;
  }
  const todo: Todo = {
    content: 'What is  Eventloop',
    user: 'Horace',
    isCompleted: false,
  }
  todo.user = 'Horace111' // 编辑器提示报错 read-only
  ```

- 多余属性检查

  有些对象可以在初始属性的基础上动态增加  

  TS 提供多余属性检查的写法

  举个栗子：

  ```typescript
  interface Todo{
    isComplete: boolean;
    [propName: string]: any;    
  }
  ```

  Todo 一定拥有 `isCompleted` 属性，其他的属性可以动态添加，动态添加的属性值类型不清楚，所以可以用 `any` 来表示值类型

### Enum

- 枚举是 TS 中独有的概念，常用于给一类变量做类型注解，它们的值是一组值里面的某一个

- 举个栗子：

  ```typescript
  enum UserId {
    Horace,
    Tarcy,
    Grace
  }
  interface Todo {
    content: string;
    user: UserId;
    time: string;
    isCompleted: boolean;
  }
  
  ```

- 数字枚举

  UserId 中的枚举值对应着相应的数字，从 0 开始递增

  也可以手动给其中某一个枚举值赋值一个数组，这个枚举值后面的值会依次在这个赋值的数字上递增

  举个栗子：

  ```typescript
  enum UserId {
    Horace,
    Tarcy = 5,
    Grace
  }
  ```

  每个枚举值对应的数次依次是：0, 5, 6

- 字符串枚举

  举个栗子：

  ```typescript
  enum UserId {
    Horace = '6666',
    Tarcy = '1234',
    Grace = '5678'
  }
  ```

- 异构枚举

  举个栗子：

  ```typescript
  enum UserId {
    Horace = '6666',
    Tarcy = 1234,
    Grace = '5678'
  }
  ```

### TS 中的函数重载

- 重载（Overloads）是 TS 独有的概念，在 JS 中没有，它主要为函数多返回类型服务，具体来说就是一个函数可能会在内部执行一个条件语句，根据不同的条件返回不同的值

- 使用重载，通过定义一系列同样函数名，不同参数列表和返回值的函数来注解多类型返回值函数

- 举个栗子：

  ```typescript
  let suits = ["hearts", "spades", "clubs", "diamonds"];
  
  function pickCard(x: { suit: string; card: number }[]): number;
  function pickCard(x: number): { suit: string; card: number };
  function pickCard(x): any {
    // 如果 x 是 `object` 类型，那么我们返回 pickCard 从 myDeck 里面取出 pickCard1 数据
    if (typeof x == "object") {
      let pickedCard = Math.floor(Math.random() * x.length);
      return pickedCard;
    }
    // 如果 x 是 `number` 类型，那么直接返回一个可以取数据的 pickCard2
    else if (typeof x == "number") {
      let pickedSuit = Math.floor(x / 13);
      return { suit: suits[pickedSuit], card: x % 13 };
    }
  }
  
  let myDeck = [
    { suit: "diamonds", card: 2 },
    { suit: "spades", card: 10 },
    { suit: "hearts", card: 4 }
  ];
  let pickedCard1 = myDeck[pickCard(myDeck)];
  alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
  
  let pickedCard2 = pickCard(15);
  alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
  ```

### 交叉类型

- 交叉类型就是多个类型，通过 `&` 类型运算符，合并成一个类型，这个类型包含了多个类型中的所有类型成员

- 举个栗子：

  ```typescript
  interface ErrorHandling {
    success: boolean;
    error?: { message: string };
  }
  
  interface ArtistsData {
    artists: { name: string }[];
  }
  
  const handleArtistsResponse = (response: ArtistsData & ErrorHandling) => {
    if (response.error) {
      console.error(response.error.message);
      return;
    }
  
    console.log(response.artists);
  };
  ```

### 联合类型

- 联合类型通过操作符 `|` ，将多个类型进行联合，组成一个复合类型
- 当用这个复合类型注解一个变量的时候，这个变量可以取这个复合类型中的任意一个类型
- 类似枚举类型，一个变量可能存在多个类型，但是最终只能取一个类型

### 字面量类型与类型守卫

#### 字面量类型

字面量可是说是 TS 类型系统里面最小的类型，就像 JS 里面的数字 1，它不可能再拆成更小的部分了，一般字面量类型分为两种：

1. 数字字面量

2. 字符串字面量

#### 数字字面量

举例：将 `123` 作为类型使用就是数组字面量类型

`let str: 123`

初始化 `str` 变量的时候只能是赋值 123

#### 字符串字面量

举例：将 `'123'` 作为类型使用就是数组字面量类型

`let str: '123'`

初始化 `str` 变量的时候只能是赋值 '123'

> 字面量类型特点：被注解为对应字面量类型的变量，在赋值的时候只能赋值为这个被注解的字面量

#### 字面量类型搭配联合类型

1. 实现枚举

   举例：电脑系统类型

   ```typescript
   osType: 'Linux' | 'Mac' | 'Windows'
   ```

2. 实现类型守卫

#### 类型守卫

主要用于在进行 ” 联合 “ 的多个类型之间，存在相同的字段，也存在不同的字段，然后需要区分具体什么时候是使用哪个类型

举例：

根据性别提供服装

```typescript
interface Male {
  gender: 'male'
  Malecloth: 'shirt'
}

interface Female {
  gender: 'female'
  Femalecloth: 'skirt'
}

function getCloth(gender: Male | Female) {
  switch(gender.gender) {
    case 'male': 
      console.log(gender.Malecloth)
      break
    case 'female':
      console.log(gender.Femalecloth)
      break
    default:
      break
  }
}
```

### 类型别名(Type)

TS 允许为类型创建一个名字，这个名字就是类型的别名，进而可以在多处使用这个别名，并且有必要的时候，可以更改别名的值（类型），以达到一次替换，多处应用的效果

举个栗子：

```typescript
type Name = string;
type NameResolver = () => string;
type NameParams = Name | NameResolver;

function getName(n: NameParams): Name {
  // ...
}
```

返回值可以更加明确就是 `Name` 类型，并且可以做到一改全改

### 类型别名和接口(Type & Interface)

接口主要是用来定义一个结构的类型，比如定义一个对象的类型，而类型别名可以是任意细粒度的类型定义

### 类的注解

- 实例属性
- 静态方法：注解参数 | 返回值
- 构造函数：注解参数
- 普通方法：注解参数 | 返回值
- 访问限定符：Public | Private | Protected
- 只读修饰符：readonly，一旦确定就不会变了

### 抽象类

#### 抽象类和抽象方法

抽象类的定义实现使用 `abstract` 关键字

```typescript
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log("Roaming the earth...");
  }
}
```

**抽象类不允许被实例化**

抽象方法注解参数和返回值，不给出具体的实现

#### 抽象类的继承

抽象类只可以被继承不可以被实例化，继承也有些不同

**如果一个类继承另外一个抽象类，那么它必须得实现抽象类中的抽象方法**

举个栗子：

```typescript
abstract class Animal {
  abstract makeSound(): void;
  move(): void {
    console.log("Roaming the earth...");
  }
}

class Duck extends Animal {
  makeSound(): void {
    console.log('ga ga ga...');
  }
}
```

