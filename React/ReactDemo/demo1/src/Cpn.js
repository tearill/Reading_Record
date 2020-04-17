import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './style.css';
import CpnItem from './CpnItem'
import Boss from './Boss'

class Cpn extends Component {
  // 在某一时刻可以自动执行的函数
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: ['基础按摩', '精油推背']
    }
  }

  componentWillMount() {
    console.log('componentWillMount---组件将要挂载到页面的时刻');
  }

  componentDidMount() {
    console.log('componentDidMount---组件挂载完成的时刻');
    // 只触发一次
    axios.post('https://web-api.juejin.im/v3/web/wbbr/bgeda')
      .then(res => {
        console.log('axios 获取数据成功：' + JSON.stringify(res));
      })
      .catch(error => {
        console.log('axios 获取数据失败：' + error);
      })
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps');
  }

  shouldComponentUpdate() {
    console.log('1-shouldComponentUpdate');
    return true;
  }

  componentWillUpdate() {
    console.log('2-componentWillUpdate');
    // return true;
  }

  render() {
    console.log('3-render---组件挂载更新');
    return (
      // <div>
      <Fragment>
        {/* flex */}
        <div>
          <label htmlFor="name">增加服务：</label>
          {/* 事件绑定要注意 this */}
          {/* 1. 使用 bind 绑定作用域 -> 官方推荐方式，也是性能最好的方式
          只会生成一个方法实例，并且绑定一次之后如果多次用到这个方法也不需要再绑定 */}
          <input
            id="name"
            className="input"
            value={this.state.inputValue}
            onChange={this.inputChange.bind(this)}
            ref={(input) => { this.input = input }}
          />
          {/* 2. 箭头函数 */}
          <button onClick={() => this.addList()}>增加服务</button>
        </div>
        <ul ref={(ul) => { this.ul = ul }}>
          <TransitionGroup>
            {/* <li>头部按摩</li>
          <li>精油推背</li> */}
            {
              this.state.list.map((item, index) => {
                return (
                  // <li 
                  //   key={index+item} 
                  //   onClick={this.deleteItem.bind(this, index)}
                  //   dangerouslySetInnerHTML={{__html: item}}
                  // >
                  //   {/* dangerouslySetInnerHTML 加上 HTML 解析 */}
                  //   {/* {item} */}
                  // </li>
                  <CSSTransition
                    timeout={2000}
                    classNames="boss-text"
                    unmountOnExit
                    appear={true}
                    key={index+item}
                  >
                    <CpnItem
                      key={index + item}
                      content={item}
                      index={index}
                      deleteItem={this.deleteItem.bind(this)}
                    />
                  </CSSTransition>
                )
              })
            }
          </TransitionGroup>
        </ul>
        <Boss />
        {/* </div> */}
      </Fragment>
    )
  }

  componentDidUpdate() {
    console.log('4-componentDidUpdate---组件更新完成')
  }

  inputChange() {
    // console.log(e.target.value);
    // this.state.inputValue = e.target.value;
    this.setState({
      // inputValue: e.target.value
      inputValue: this.input.value
    })
  }
  addList() { // 增加列表
    // 状态改变是异步操作
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
    }, () => { // 放在回调中打印
      console.log(this.ul.querySelectorAll('li').length);
    })
  }
  deleteItem(index) { // 删除列表项
    // console.log(index);
    // this.setState.list.splice(index, 1);
    // React 没有依赖收集
    let list = this.state.list;
    list.splice(index, 1);
    this.setState({
      list: list
    })
  }
}

export default Cpn;