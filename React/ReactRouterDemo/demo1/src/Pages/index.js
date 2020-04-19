import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { cid: 123, title: 'Horace1的个人博客' },
        { cid: 456, title: 'Horace2的个人博客' },
        { cid: 789, title: 'Horace3的个人博客' },
      ]
    }
    // 函数式路由重定向，进入页面的时候重定向
    this.props.history.push('/home/');
  }
  render() {
    return (
      <div>
        {/* 标签式路由重定向 */}
        {/* <Redirect to="/home/" /> */}
        <h2>Index Page</h2>
        <ul>
          {
            this.state.list.map((item, index) => {
              return (
                <li key={index}>
                  <Link to={'/list/' + item.cid}>{item.title}</Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default Index;