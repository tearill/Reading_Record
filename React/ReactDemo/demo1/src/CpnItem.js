import React, { Component } from 'react';

class CpnItem extends Component {
  constructor(props) {
    super(props);
    this.hanleClick = this.hanleClick.bind(this);
  }
  state = {  }
  render() { 
    return ( 
      <li onClick={this.hanleClick}>{this.props.content}</li>
    );
  }
  hanleClick() {
    // console.log(this.props.index);
    this.props.deleteItem(this.props.index);
  }
}

export default CpnItem;