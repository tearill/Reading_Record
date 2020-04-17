# React 学习  

- 事件绑定  
  举例：onClick="this.inputChange.bind(this)"  
  绑定当前的作用域，否则拿不到 state  

- 父子组件传值  
  父传子：属性传值 props  
  传事件：属性传值  

- React 是单向数据流，父组件传给子组件的值是只读的，子组件不能直接更改父组件的 state  
  子组件可以通过父组件传递的事件进行更改父组件的 state  

- props 传值类型校验  
  使用 `prop-types`  
  `import PropTypes from 'prop-types'`  
  在 class 定义组件的外部进行校验  
  注意：`cpnName.propTypes = { 校验内容 }`  
  引入的 `PropsTypes` 是校验的类型，使用 `propTypes` 属性进行校验  
  `isRequired` 表示 props 传值是必须的  
  `cpnName.defaultProps = { props 默认值 }` 使用 defaultProps 属性指定 props 的默认值  

- this.setState -> 异步操作  
  需要数据改变后进行的操作可以放在 this.setState 的回调函数中执行  

- React 生命周期  
  四个部分：Initialization -> Mounting -> Updation -> Unmounting  
  - Initialization: props 和 state 初始化  
  - Mounting:  
    1. componentWillMount: DOM 挂载之前，只会被调用一次，调用 this.setState 不会引起组件重新渲染  
    2. render: 根据组件 state 和 props 改变，return 一个 React 元素(描述组件，UI)，不负责实际的渲染工作，之后由 React 自身根据 return 的元素进行 DOM 页面渲染  
      **render 是纯函数**，不能在里面执行 this.setState，会有改变组件状态的副作用  
    3. componentDidMount: 组件挂载到 DOM 之后调用，只会被调用一次  
  - Updation:  
    **Vue 会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树.而对于 React 而言,每当应用的状态被改变时,全部组件都会重新渲染,所以 React 中会需要 shouldComponentUpdate 这个生命周期函数方法来进行控制**  
    造成组件更新有两类（三种）情况：  
    - 父组件重新 render  
      + 直接使用，每当父组件重新 render 导致的重传 props，子组件将直接跟着重新渲染，无论 props 是否有变化。可通过 shouldComponentUpdate 方法优化  
      + 在 componentWillReceiveProps 方法中，将 props 转换成自己的 state  
    - 组件本身调用 setState，无论 state 有没有变化  

    1. componentWillReceiveProps(nextProps)  
      此方法只调用于 props 引起的组件更新过程中，参数 nextProps 是父组件传给当前组件的新 props，但父组件render 方法的调用不能保证重传给当前组件的 props 是有变化的，所以在此方法中根据 nextProps 和 this.props 来判断重传的 props 是否改变，以及如果改变了要执行啥，比如根据新的 props 调用 this.setState 触发当前组件重新 render  

      **组件第一次存在于 DOM 中，函数是不会被执行的**  
      **如果已经存在于 DOM 中，函数才会被执行**  

    2. shouldComponentUpdate(nextProps, nextState)  
      此方法通过比较 nextProps，nextState 及当前组件的 this.props，this.state，返回 true 时当前组件将继续执行更新过程，返回 false 则当前组件更新停止，以此可用来减少组件的不必要渲染，优化组件性能  

      就算 componentWillReceiveProps() 中执行了 this.setState，更新了 state，但是在 render 之前 this.state 仍然指向旧的 state，否则 nextState 和当前组件 state 对比一直是 true  

    3. componentWillUpdate(nextProps, nextState)  
      此方法在调用 render 方法前执行，可执行一些组件更新发生前的工作，一般较少用  
  - Unmounting  
    1. componentWillUnmount  
      可以在这里执行一些清理工作，比如清楚组件中使用的定时器，清除 componentDidMount 中手动创建的 DOM 元素等，以避免引起内存泄漏  
    
- **新版生命周期**  
  1. static getDerivedStateFromProps(nextProps,prevState)  
    接收父组件传递过来的 props 和组件之前的状态，返回一个对象来更新 state 或者返回 null 来表示接收到的 props 没有变化，不需要更新 state  
  2. getSnapshotBeforeUpdate(prevProps, prevState)  
    接收父组件传递过来的 props 和组件之前的状态，此生命周期钩子必须有返回值，返回值将作为第三个参数传递给 componentDidUpdate。必须和 componentDidUpdate 一起使用，否则会报错  

- react-transition-group  
  import { CSSTransition } from 'react-transition-group';  
  类名：xxx-enter{} 进入页面之前  
    xxx-enter-active{} 入场到结束之前  
    xxx-enter-done{} 入场结束  
    xxx-exit{} 离场开始  
    xxx-exit-active{} 离场开始到离场结束  
    xxx-exit-done{} 离场结束  

  unmountOnExit 离场删除 DOM  

- 多 DOM 动画  
  