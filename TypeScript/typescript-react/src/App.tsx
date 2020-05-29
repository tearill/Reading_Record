import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  Button,
  Typography,
  Form,
  Menu,
  Tabs
} from 'antd'
import { DownOutlined } from '@ant-design/icons'
import TodoInput from "./TodoInput"
import TodoList, { MenuKey } from "./TodoList"
import { todoListData } from "./utils/data"
const { Title } = Typography
const { TabPane } = Tabs

// import {} from './'

const menu = (
  <Menu>
    <Menu.Item>完成</Menu.Item>
    <Menu.Item>删除</Menu.Item>
  </Menu>
)

function App() {
  const [todoList, setTodoList] = useState(todoListData)

  const callback = () => {}

  const onFinish = (values: any) => {
    // console.log('onFinish')
    const newTodo = { ...values.todo, isCompleted: false }
    setTodoList(newTodo)
  }

  const ref = useRef(null)
  const activeTodoList = todoList.filter(todo => !todo.isCompleted);
  const completedTodoList = todoList.filter(todo => todo.isCompleted);

  const onClick = (todoId: string, key: MenuKey) => {
    if (key === "complete") { // 添加到完成
      const newTodoList = todoList.map(todo => {
        if (todo.id === todoId) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }

        return todo;
      });

      setTodoList(newTodoList);
    } else if (key === "delete") { // 删除对应的
      const newTodoList = todoList.filter(todo => todo.id !== todoId);
      setTodoList(newTodoList);
    }
  };

  return (
    <div className="App" ref={ref}>
      <div className="container header">
        <img src={logo} alt=""/>
        <Title level={3}>Horace TodoList</Title>
      </div>
      <div className="container">
        <Form onFinish={onFinish}>
          <Form.Item name="todo">
            <TodoInput />
          </Form.Item>
          <Form.Item name="todo">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="container">
        <Tabs onChange={callback} type="card">
          <TabPane tab="所有" key="1">
            <TodoList todoList={todoList} onClick={onClick} />
          </TabPane>
          <TabPane tab="进行中" key="2">
            <TodoList todoList={activeTodoList} onClick={onClick} />
          </TabPane>
          <TabPane tab="已完成" key="3">
            <TodoList todoList={completedTodoList} onClick={onClick} />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
