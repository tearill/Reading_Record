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

```js
// 全局过滤器 -> 直接放到 main.js 中所有页面都可以使用
Vue.filter('uppecase', value => {
  return value.toUpperCase()
})
```
- filter 跟 comouted 的区别  
  filter 重视的是格式化，只改变数据的格式  
  computed 重视的是重新计算  

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
     + created：实例已经在内存创建，data 和 methods 已经创建，还没有开始编译模板，$el 属性目前不可见  
     + beforeMount：已经完成模板的编译，但是还没有挂载到页面中，相关的render函数首次被调用，只是在内存中渲染好了模板，只有模板字符串  
     + mounted：此时已经将编译好模板挂载到页面指定的容器中显示，el 被新创建的 vm.$el 替换，并挂在到实例上去之后调用该钩子函数  
  2. 运行期间的生命周期函数  
     + beforeUpdate：状态更新之前执行，发生在虚拟DOM重新渲染和打补丁之前，此时 data 中的状态值是最新的，但是页面上数据还是旧的，因为还没有重新开始渲染 DOM  
     + updated：实例更新完成后调用，由于数据更改导致的虚拟DOM重新渲染和打补丁，在这之后会调用该钩子，此时 data 中的状态值和界面上显示的数据都完成了更新，界面已经被重新渲染好了，应该避免在此期间更改状态，因为这可能会导致更新无限循环  
  3. 销毁期间的生命周期函数   
     + beforeDestroy：实例销毁之前调用，此时实例仍然完全可用  
     + destroyed：Vue 实例销毁后调用，调用后 Vue 实例指示的所有东西都会解绑，所有的事件监听器都会被移除，所有的子实例也会被销毁  
  - 如果要调用 methods 中的方法，或者操作 data 中的数据，最早只能在 created 中  
  - 使用 vue-cli 脚手架，生命周期表现形式可能会有不一样，分成了多个模板  
(改到 vue/lifecycle.html)  
  - ajax 请求最好放在 created 里面，因为此时已经可以访问 this 了，请求到数据就可以直接放在data里面  
  - mounted 是实例创建期间的最后一个生命周期函数，当执行完 mounted，实例已经被完全创建了，组件进入运行阶段   
  - 如果要通过某些插件操作页面上的 DOM 结点，最早要在 mounted 中进行，在 mounted 前面访问 DOM 会是 undefined  

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
     + 传递 number、boolean、object、array 类型的时候要注意用 : 做动态绑定，否则传递过去的参数类型会不正确，比如 number 会变成 String类型  
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

- 作用域插槽 --- slot-scope2.vue  
  父组件替换插槽的标签，但是内容由子组件来提供  
  数据在子组件中，父组件要拿到数据来展示，但是父组件拿不到子组件的数据  
  + 在子组件的 slot 中加上动态属性(:data --- 名字可以自己去取)绑定传递的数据  
  + 在父组件引用子组件给插槽添加内容的时候加上 `<template>` 标签编译  
    (在 Vue 2.5.x 之后不需要加 `<template>` 标签，但是为了代码的兼容性和健壮性最好还是加上)  
  + 父组件通过 slot-scope="slot" 属性拿到子组件的数据，使用 slot.data(名字根据子组件设置的动态属性决定)取出数据  

  * 在 Vue 2.6.0 开始，slot-scope 语法已经废弃，但语法还是支持，推荐使用 v-slot 代替  
  * v-slot:name 可以使用 #name 代替，取子组件数据的时候可以使用解构  

## day 9  

- 添加学习  
  + 隔代组件之间的传值 --- Component-5.vue  
    $attr 和 $listeners  
    举例：A 组件中使用 B 组件，B 组件使用 C 组件  
    1. 在 A 组件上绑定参数传递给子组件，B 组件通过 props 可以获取 A 组件传递过来的属性参数  
    2. B 组件上绑定事件，通过 $emit('...') 给父组件传递一个事件，父组件通过这个事件拿到传递的数据并作出反应  
    3. B 组件中使用 C 组件的时候给 C 组件 v-bind 绑定 $attrs 属性，C 组件可以通过 $attrs. 获取到父组件中传递下来的 props（除了 cpn1 组件中 props 获取掉的）  
    4. B 组件中使用 C 组件时 v-on 动态绑定 $listeners 属性，这样在 C 组件中就可以通过 $emit 触发父组件的事件并且传值  
  + 兄弟组件之间的传值 --- Component-6.vue  
    使用 EventBus，通过新建一个 Vue 事件 bus 对象作为中间媒介，然后通过 bus.$emit 触发事件，bus.$on 监听触发的事件，bus.$off 取消监听(beforeDestroy)  
  + provide 和 inject 实现组件通信  
    在父组件中通过 provide 来提供属性，然后在子组件中通过 inject 来注入变量。   
    父组件:  
    ```js
    provide: {
      for:'test'
    },
    ```
    子组件:  
    ```js
    inject: ['for'],
    ```
    通过 inject 注入的属性是挂载到 Vue 实例上的，所以在组件内部可以通过 this 来访问  
    provide 和 inject 主要为高阶插件/组件库提供用例，并不推荐直接用于应用程序代码中  
    
## day 10  

- Element-ui 中的 `<el-alert>` 组件源码学习，详见 repo：[Interview_Related/Source-code/element-ui-code](https://github.com/tearill/Interview_Related/tree/master/Source-code/element-ui-code)  


## day 11  

- vue-router 学习  
  
- 参数  
  1. mode: 使用什么方式切换路由  
     'history': html5 的 history api  
     'hash': 会在路由加上 #/  
  2. base: 根路径，一般设置为 '/'  
  3. routes: 路由匹配规则  

- 路由对应组件的加载  
  两种方式  
  1. import xxx from ''  
     然后在 component 中放上 xxx  
  2. component: () => import('')  
  第一种方式为同步加载，进入网站的时候一次性全部请求完成  
  第二种方式为异步加载，访问到相应的路由的时候才会去请求(懒加载)  
  首页等比较重要的页面适合同步加载，其他页面适合懒加载，提升网站打开速度  

- 获取当前路由对象 --- Router.vue  
  $route  
  $route.fullPath: 页面路由的全地址，会带上参数等，比如：/demo?a=1  
  $route.path: router 中页面配置的地址，不会带上参数等  
  $route.matched: 匹配到的路由，是一个数组  
  $route.params: 路由中的参数  
  $route.query: query参数，比如：/demo?a=1 -> query: {a: "1"}  
  + routes 路由规则中的 meta：  
    返回在 $route.meta，可以根据返回 meta 的不同进行相应操作，个性化定制  

- 获取全局路由对象  
  $router  
  包含所有的路由信息  

- 路由 param 参数  
  动态路由：比如 /demo/:id -> 可以传参数，名为 id，但是值不确定，是一个变化的值  
  动态路由可以使用正则表达式，比如：/demo/:id? -> id 可传可不传，？表示0次或1次  
  /demo/:id(\\d)?  

- 路由的切换方法：  
  1. router-link：相当于 a 标签，to 属性相当于 href，必须配合 router-view 使用，页面的内容渲染在 router-view 的位置  
  2. JS 方式切换：  
     + this.$router.push('')  
     + this.$router.push({ name: '', query: { key: '' }' .....})  
     + this.$router.push({ path: '' }) --- 不能传 param  
     + this.router.replace() --- 用法和 push 一样，但是不会产生历史记录，不会被浏览器的前进和后退记录到  
     + this.router.go(-1) --- 类似 window.history.go()

- 子路由、重定向、alias  
  + children: [{}] --- path 不能加 /，加了会从 / 根路径开始匹配  
    配合 router-view 显示在页面上  
  + redirect: '' --- 重定向  
  + alias: '' --- 路由别名  

- 404 页面配置  
  当输入的路径匹配不到所有的路由规则时显示 404 页面表示没找到  
  使用通配符 * 匹配，路由的匹配规则是按照数组的顺序从前往后，把 * 放在最后匹配剩下的  

- 路由的钩子函数(路由守卫) --- router/index.js  
  + 全局的路由钩子函数：  
    beforeEach(to, from, each) --- 进入路由之前的钩子函数，next 用于改变路由导航  
    afterEach(to, from) --- 跳转路由之后的钩子函数，不能改变路由导航  
  + 局部的路由钩子函数(每个路由自身的钩子)：  
    在路由配置规则 routes 中定义：  
    beforeEnter(to, from , next) -- 进入该路由之前    
  + 页面(组件)中的钩子函数  
    beforeRouteEnter(to, from, next) --- 进入路由对应组件之前，钩子在导航确认前被调用，因此即将登场的新组件还没被创建，拿不到组件的this，可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。  
    beforeRouteUpdate(to, from, next) --- 可以访问组件实例，在切换二级导航的时候会触发  
    beforeRouteLeave(to, from, next) --- 可以访问组件实例，通常用来禁止用户在还未保存修改前突然离开，可以通过 next(false) 来取消导航  
  > 钩子函数执行顺序：全局钩子 -> 路由配置的相同的局部钩子 -> 组件上配置的相同的钩子  
  例如：beforeEach -> beforeEnter -> beforeRouteEnter -> afterEach  
  > beforeEnter、beforeRouteEnter 和 beforeRouteUpdate 不会同时执行 -> 切换二级导航的时候只会触发 beforeRouteUpdate  

- 路由钩子在实际开发中的应用场景  
  1. 清楚组件当中的定时器 --- beforeRouteLeave()  
  2. 当页面中有未保存的内容，阻止页面的跳转 --- beforeRouteLeave()  
  3. 保存相关内容到 Vuex 中或 Session 中 --- beforeRouteLeave()  

- 钩子函数的补充：  
  1. activated：keep-alive 组件激活时调用  
  2. deactivated：keep-alive 组件停用时调用  
  **调用时机**  
  activated 在组件第一次渲染时会被调用，之后在每次缓存组件被激活时调用  
  activated 调用时机：第一次进入缓存路由/组件，在 mounted 后面，beforeRouteEnter 守卫传给 next 的回调函数之前调用  
  `beforeMount => 如果你是从别的路由/组件进来(前一个组件执行销毁 destroyed/或离开缓存 deactivated) => mounted => activated 进入缓存组件 => 执行 beforeRouteEnter 回调`  
  因为组件被缓存了，再次进入缓存路由/组件时，不会触发这些钩子(beforeCreate、created、beforeMount、mounted 都不会触发)  
  之后的调用时机是: `组件销毁 destroyed/或离开缓存 deactivated => activated 进入当前缓存组件 => 执行 beforeRouteEnter 回调(组件缓存或销毁，嵌套组件的销毁和缓存也在这里触发)`  
  -----------------------------
  deactivated：组件被停用(离开路由)时调用，离开当前路由并进入另一路由(beforeEach、afterEach)之后  
  使用了 keep-alive 就不会调用 beforeDestroy(组件销毁前钩子)和 destroyed(组件销毁)，因为组件没被销毁，被缓存起来了，这个钩子可以看作 beforeDestroy 的替代，如果你缓存了组件，要在组件销毁的的时候做一些事情，可以放在这个钩子里  
  如果你离开了路由，会依次触发：`组件内的离开当前路由的钩子 beforeRouteLeave => 路由前置守卫 beforeEach => 全局后置钩子 afterEach => deactivated 离开缓存组件 => activated 进入缓存组件(如果你进入的也是缓存路由)`  
  如果离开的组件没有缓存的话：beforeDestroy 会替换 deactivated  
  如果进入的路由也没有缓存的话：全局后置钩子 afterEach => 销毁 destroyed => beforeCreate 等  
  
## day 12  

- vuex 学习  