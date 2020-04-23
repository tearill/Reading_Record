import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Index() {
  useEffect(() => {
    console.log(`useEffect => 来了老弟，Index`);
    return () => {
      console.log(`useEffect => 老弟你走了，Index`); // 相当于解绑
    }
  }, []); // 只有数组中的状态发生变化才会触发解绑，设为空只有在组件销毁的时候才会触发解绑
  return <h2>ihorace.cn</h2>
}

function List() {
  useEffect(() => {
    console.log(`useEffect => 来了老弟，List`)
  })
  return <h2>List Page</h2>
}

function Example() {
  const [count, setCount] = useState(0); // 初始值
  // let _useState = useState(0);
  // let count = _useState[0];
  // let setCount = _useState[1];
  useEffect(() => {
    console.log(`useEffect => You clicked ${count} times`);
    return () => {
      console.log('=======================');
    }
  }, [count]);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => {setCount(count+1)}}>Click me</button>

      <Router>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/list">列表</Link></li>
        </ul>
        <Route path="/" exact component={Index} />
        <Route path="/list/" component={List} />
      </Router>
    </div>
  )
}

export default Example;