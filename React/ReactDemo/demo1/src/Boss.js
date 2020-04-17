import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isShow: true
    }
    this.toToggle = this.toToggle.bind(this);
  }
  render() { 
    return ( 
      <div>
        {/* <div className={this.state.isShow?'show':'hide'}>Boss级人物---孙悟空</div> */}
        <CSSTransition
          in={this.state.isShow}
          timeout={2000}
          classNames="boss-text"
          unmountOnExit
          // unmountOnExit 离场删除 DOM
        >
          <div>Boss级人物---孙悟空</div>
        </CSSTransition>
        <div>
          <button onClick={this.toToggle}>召唤Boss</button>
        </div>
      </div>
    );
  }

  toToggle() {
    this.setState({
      isShow: !this.state.isShow
    })
  }
}
 
export default Boss;