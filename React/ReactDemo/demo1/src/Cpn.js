import React, { Component, Fragment } from 'react';
import './style.css';
import CpnItem from './CpnItem'

class Cpn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      list: ['基础按摩', '精油推背']
    }
  }
  render() {
    return (
      // <div>
      <Fragment>
       {/* flex */}
        <div>
          <label htmlFor="name">增加服务：</label>
          {/* 事件绑定要注意 this */}
          {/* 1. 使用 bind 绑定作用域 -> 官方推荐方式，也是性能最好的方式
          只会生成一个方法实例，并且绑定一次之后如果多次用到这个方法也不需要再绑定 */}
          <input id="name" className="input" value={this.state.inputValue} onChange={this.inputChange.bind(this)} />
          {/* 2. 箭头函数 */}
          <button onClick={() => this.addList()}>增加服务</button>
        </div>
        <ul>
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
                <CpnItem 
                  key={index+item}
                  content={item}
                  index={index}
                  deleteItem={this.deleteItem.bind(this)}
                />
              )
            })
          }
        </ul>
       {/* </div> */}
      </Fragment>
    )
  }
  inputChange(e) {
    // console.log(e.target.value);
    // this.state.inputValue = e.target.value;
    this.setState({
      inputValue: e.target.value
    })
  }
  addList() { // 增加列表
    this.setState({
      list: [...this.state.list, this.state.inputValue],
      inputValue: ''
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