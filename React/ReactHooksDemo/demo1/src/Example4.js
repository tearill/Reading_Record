// useContext 解决父子组件传值
// useReducer 解决状态共享问题
import React, { useState, createContext, useContext } from 'react';

const CountContext = createContext();

function Counter() {
  let count = useContext(CountContext);
  return (<h2>{count}</h2>)
}

function Example4() {
  const [count, setCount] = useState(0); // 初始值

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => {setCount(count+1)}}>Click me</button>
      {/* 把 count 共享出去 */}
      <CountContext.Provider value={count}>
        <Counter />
      </CountContext.Provider>
    </div>
  )
}

export default Example4;