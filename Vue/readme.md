# Vue 学习  

## day 1  

比较了 Vue 中 MVVM 思想和后端的 MVC 思想  
学习了 Vue 中 MVVM 思想  
学习了数据绑定和事件绑定  

### 为什么在 HTML 中监听事件?  
  1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法  

  2. 无须在 JavaScript 里手动绑定事件，ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试  

  3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除，无须担心如何清理  

## day 2  

更改了一下学习策略，直接通过 vue-cli 脚手架学习 Vue，同时也会根据学习的内容使用不同的方式进行学习  

- 事件修饰符 --- Demo1.vue  
  1. .stop --- 阻止事件冒泡 --- 在子元素身上进行处理阻止事件冒泡  
  2. .prevent --- 阻止默认事件
  3. .self --- 只有点击元素自身的时候才会触发事件 --- 在父元素上进行处理阻止事件冒泡  
  4. .capture --- 添加事件侦听器时使用事件捕获机制 --- 从外到里执行事件  
  5. .once --- 事件只触发一次  

- .stop 和 .self 阻止冒泡的区别：  
  .self 只会阻止自己的冒泡  

- v-model 数据的双向绑定 --- Demo2.vue  
  v-model 实现计算器  

## day 3  

品牌列表综合案例，综合运用数据、事件绑定，事件修饰符等  
学习了过滤器 filter --- 私有过滤器会屏蔽全局同名过滤器  
通过过滤器实现品牌列表综合案例中时间的格式化  

- v-if 和 v-show --- 条件渲染  
  v-if 条件渲染在切换的时候会直接把元素从DOM 中删除  
  v-show 条件渲染在切换的时候只是切换元素的 display 属性 --- display:none & display:block  
  + v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建  
  + v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块  
  + v-show 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换
  + v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，使用 v-show 较好，如果在运行时条件很少改变，使用 v-if 较好  

  > 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级，这意味着 v-if 将分别重复运行于每个 v-for 循环中

## day4  

- 完善品牌列表案例，添加 padstart 填充时间格式  

- 学习了自定义全局按键修饰符，并把它添加到案例中  
  Vue.config.keyCodes.f2 = 113;  

- 学习自定义指令(全局和局部两种方式)，添加到案例中实现文本框获得焦点  
  全局：Vue.directive  
  局部/私有：directives  

- 简单了解自定义指令中第二个参数提供的几个钩子函数：  
  通过 binding 拿到传递的参数  
  1. bind：指令第一次绑定到元素上的时候调用 --- 只调用一次 --- 元素刚绑定指令的时候还没有插入 DOM 中  
  2. inserted：被绑定元素插入父节点时调用  
  3. update：所在组件的 VNode 更新时调用  
  4. componentUpdated：所在组件的 VNode 及其孩子的 VNode 全部更新时调用  
  5. unbind：指令与元素解绑的时候调用 --- 只调用一次  
  - 第一个参数都是 el，表示绑定的元素  
  - 和 JS 行为有关的操作，最好在 inserted 中执行，防止 JS 行为不生效  
  - 和样式相关的操作，一般都可以在 bind 中执行  

## day 5

- 学习自定义指令集成第三方插件 --- 当成第三方插件引入  

### 生命周期钩子函数学习 --- 三大类  
  1. 创建期间的生命周期函数  
     + beforeCreate：实例刚在内存中被创建，此时还没有初始化好 data 和 methods    
     + created：实例已经在内存创建，data 和 methods 已经创建，还没有开始编译模板  
     + beforeMount：已经完成模板的编译，但是还没有挂载到页面中，只是在内存中渲染好了模板，只有模板字符串  
     + mounted：此时已经将编译好模板挂载到页面指定的容器中显示  
  2. 运行期间的生命周期函数  
     + beforeUpdate：状态更新之前执行，此时 data 中的状态值是最新的，但是页面上数据还是旧的，因为还没有重新开始渲染 DOM  
     + updated：实例更新完成后调用，此时 data 中的状态值和界面上显示的数据都完成了更新，界面已经被重新渲染好了  
  3. 销毁期间的生命周期函数   
     + beforeDestroy：实例销毁之前调用，此时实例仍然完全可用  
     + destroyed：Vue实例销毁后调用，调用后 VUe 实例指示的所有东西都会解绑，所有的事件监听器都会被移除，所有的子实例也会被销毁  
  - 如果要调用 methods 中的方法，或者操作 data 中的数据，最早只能在 created 中  
  - 使用 vue-cli 脚手架，生命周期表现形式可能会有不一样，分成了多个模板  
(改到 vue/lifecycle.html)  
  - mounted 是实例创建期间的最后一个生命周期函数，当执行完 mounted，实例已经被完全创建了，组件进入运行阶段   
  - 如果要通过某些插件操作页面上的 DOM 结点，最早要在 mounted 中进行  

### 计算属性和侦听属性 --- computed & watch  
  1. computed 计算属性： 
     + 表达式太复杂的话会导致模板难以维护，而且如果多个地方使用该表达式的话会导致重复，可以使用 computed 计算属性进行优化  
     + computed 数据的使用和 data 中的数据使用方法一样，只不过 computed 中的数据是一个函数，返回计算结果  
     + 使用函数也可以达到 computed 属性的效果，但是不推荐使用  
       原因：使用函数计算，当有数据更新，不管是不是要计算的数据，计算函数都会被执行一次，如果使用 computed，如果要计算的数据没有改变，改变的是其他的数据，就不会执行 computed，直接使用之前的数据，效率和性能更好  
     + 使用场景：  
       某个数据受多个数据影响，或者需要对其他数据进行 js 处理再显示  
  2. watch 监听属性：  
     + 默认是不会立即执行，如果要立即执行需要写成对象的格式(当 data 中的数据给的是空的时候或者是需要一开始给一个默认值的时候)
     ```js
     watch: {
      language: {
        handler(newVal) {
          if (newVal === "ch") {
            this.zhangsan = "张三";
            this.lisi = "李四";
          } else if ((newVal = "en")) {
            this.zhangsan = "zhangsan";
            this.lisi = "lisi";
          }
        },
        immediate: true
      }
    },
     ```
     + 使用场景：  
       一个数据的变化会影响多个数据，或者一个数据的变化的时候需要执行异步操作  
       调试的时候发现页面的值没有渲染，可以通过 watch 来调试  

## day 6  

- ref 的使用学习  
  相当于原生 js 中的 querySelector 获取 DOM 元素对象，用来拿到属性、添加样式等  
  + $refs 包含设置的所有的 ref --- 通过 this.$refs.(name).value 拿到元素中的一些值    
  + 可以实现数据的双向绑定，但是不会这样做双向绑定，更多的是通过 ref 获取对应元素  

### 组件化和模块化的区别  
  + 模块化：从代码逻辑的角度进行划分，方便代码分层开发，保证每个模块的职能单一  
  + 组件化：从 UI 界面的角度进行划分，方便 UI 组件重用  
  
### 自定义组件  
  组件中只能有一个根元素  
  1. 组件的定义 --- 使用的时候建议用 - 比如引入 MyComponent -> 使用 `<my-component></my-component>`  
  2. 组件的传参 --- props 数组(校验 props 对象)  --- Component-1.vue
     + 传递 number、boolen、object、array 类型的时候要注意用 : 做动态绑定，否则传递过去的参数类型会不正确，比如 number 会变成 String类型  
     + 组件在接收到参数的时候可以进行一定的修改  
  3. 子组件与父组件通信  Component-2.vue
     + 子组件设置一个提交函数，父组件设置一个接收函数  
       提交函数中使用 this.$emit 把数据信息提交给父组件的函数  
     + v-model 方式：父组件双向绑定数据，子组件接收双向绑定的数据，通过 model 传递  
       ```js
        model: {
          prop: 'msg',
          event: 'on-callback'
        },
       ```
  4. 组件插槽 slot (内容分发) --- 分发父组件的 html --- Component-3.vue  
     + slot 相当于一个占位符，站好位置等着父组件给相应的结构去填充渲染页面  
     + 多个 slot 占位的时候使用具名插槽，添加 name 属性  
  5. 动态组件  
     + 根据传值的不同显示不同的组件  
       `<component :is="cur" />`  
     + 使用 `<keep-alive></keep-alive>` 标签保持状态  

### 原生 Vue.js 自定义组件  
  如果使用了驼峰命名，在使用的时候要使用横线分割的形式  
  1. Vue.extend({}) 定义 + Vue.component 使用  --- component-1.html 
  2. 通过 `<template>` 在外部定义 --- component-2.html  
  3. 通过 components 定义内部私有组件  

- 为什么组件中的 data 必须是一个函数而且必须返回一个对象  
  为了保证组件之间的独立，使每个组件返回一个新的实例对象，实现组件的复用  

> 组件可以重复使用，每用一次相当于建立一个新的实例对象  
> 一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝  

- 组件的切换  
  1. v-if + flag --- 只能实现两个组件的切换  
  2. `<component :id=''> `  
  3. 加上动画美化，使切换不显得那么突兀  

## day 7  
  
- 实现上一次的组件切换的动画效果 --- component-switch.html  

- Vue 中的动画学习  
  四个时间点：v-enter v-enter-to v-leave v-leave-to  
  两个时间段：v-enter-avtive v-leave-active  
  v-enter | v-leave-to 作为一组，元素进入和退出的时间点  
  v-enter-active | v-leave-active 作为一组，元素进入之后和退出之前的时间段，用来展示动画效果  
  + 设置不同的动画 --- 给 transition 加 name  
  + 使用第三方类库实现 --- 给 transition 加类名  
    1. enter-active-class  
    2. leave-active-class  
    都必须加一个额外的 animated 类名，不然无法显示动画效果  
  + 半场动画：使用钩子函数  
  + 列表动画：transition-group  
    当需要过渡的元素是通过 v-for 渲染出来的，要使用 `<transition-group>`  
  + appear 实现页面入场效果属性  
    该属性是 `<transition-group>` 专属的属性  
  + `<transition-group>` 默认会渲染成一个 `<span>` 标签  
    有时候不想要 `<span>` 标签，可以使用 tag 属性指定渲染成固定的标签元素  

## day 8  

- 组件的继续学习  
  父子组件之间的访问  
  1. 父组件访问子组件 --- Component-4.vue/Component3.vue  
     + 通过 $children --- $children 是一个 [VueComponent] 类型的数组，包含所有的子组件信息  
       实际开发中 $children 用的很少，下标的取值方法在更新的时候不好维护  
       $children 适合需要拿到所有的子组件的情况  
     + 通过 $refs，在组件上添加 ref=''，直接通过 this.$refs.(name) 获取  
  2. 子组件访问父组件 --- Component-4.vue/Component3.vue  
     + 通过 $parent 访问  
     实际开发中这样的访问情况很少，会破坏组件的复用性，和父组件的耦合度太高！！！！！  
     $root --- 访问根组件 --- 一个 Vue 实例  

- 插槽、具名插槽复习  

- 编译作用域 --- slot-scope.vue  
  编译的时候根据变量存在的模板进行查找  
  + 父组件模板的所有东西都会在父级作用域内编译  
  + 子组件模板的所有东西都会在子级作用域内编译  

- 作用域插槽  
  父组件替换插槽的标签，但是内容由子组件来提供  
  数据在子组件中，父组件要拿到数据来展示，但是父组件拿不到子组件的数据  
  + 在子组件的 slot 中加上动态属性(:data --- 名字可以自己去取)绑定传递的数据  
  + 在父组件引用子组件给插槽添加内容的时候加上 `<template>` 标签编译  
    (在 Vue 2.5.x 之后不需要加 `<template>` 标签，但是为了代码的兼容性和健壮性最好还是加上)  
  + 父组件通过 slot-scope="slot" 属性拿到子组件的数据，使用 slot.data(名字根据子组件设置的动态属性决定) 取出数据  

  * 在 Vue 2.6.0 开始，slot-scope 语法已经废弃，但语法还是支持，推荐使用 v-slot 代替  
  * v-slot:name 可以使用 #name 代替，取子组件数据的时候可以使用解构  

