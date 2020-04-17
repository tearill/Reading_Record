import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';

class CpnItem extends PureComponent {
  constructor(props) {
    super(props);
    this.hanleClick = this.hanleClick.bind(this);
  }
  state = {  }
  // 组件第一次存在于 DOM 中，函数是不会被执行的
  // 如果已经存在于 DOM 中，函数才会被执行
  // componentWillReceiveProps() {
  //   console.log('child - componentWillReceiveProps 组件接收参数');
  // }
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (nextProps.content !== this.props.content) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() { 
    console.log('child - render 子组件渲染');
    return ( 
      <li onClick={this.hanleClick}>
        {this.props.avname}为你做-{this.props.content}
      </li>
    );
  }

  // componentWillUnmount() {
  //   console.log('child - componentWillUnmount 组件卸载');
  // }

  hanleClick() {
    // console.log(this.props.index);
    // this.props.list = [] // React 是单向数据流
    this.props.deleteItem(this.props.index);
  }
}

// props 类型校验
CpnItem.propTypes = {
  content: PropTypes.string,
  index: PropTypes.number,
  deleteItem: PropTypes.func,
  avname: PropTypes.string.isRequired
}

CpnItem.defaultProps = {
  avname: '111'
}

export default CpnItem;