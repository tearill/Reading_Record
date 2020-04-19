import React, { Component } from 'react';
import store from './store';
import { changeInputAction, addItemAction, deleteItemAction, getTodoList } from './store/actionCreators';
import TodoListUI from './TodoListUI';
// import axios from 'axios';

// const data = [
//   '早8点开晨会，分配今天的代码任务',
//   '早9点和项目经理开需求沟通会',
//   '早9点和项目经理开需求沟通会',
// ];

class TodoList extends Component {
  constructor(props) {
    super(props);
    // console.log(store.getState());
    this.state = store.getState();
    this.changeInputValue = this.changeInputValue.bind(this);
    this.storeChange = this.storeChange.bind(this);
    this.clickBtn = this.clickBtn.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    store.subscribe(this.storeChange);
  }

  componentDidMount() {
    const action = getTodoList();
    store.dispatch(action);
  }

  render() {
    return (
      <TodoListUI
        inputValue={this.state.inputValue}
        changeInputValue={this.changeInputValue}
        clickBtn={this.clickBtn}
        list={this.state.list}
        deleteItem={this.deleteItem}
      />
    );
  }

  changeInputValue(e) {
    // console.log(e.target.value);
    // const action = {
    //   type: CHANGE_INPUT,
    //   value: e.target.value
    // }
    const action = changeInputAction(e.target.value);
    store.dispatch(action);
  }

  storeChange() {
    this.setState(store.getState());
  }

  clickBtn() {
    // console.log('-----');
    // const action = { type: ADD_ITEM };
    const action = addItemAction();
    store.dispatch(action);
  }

  deleteItem(index) {
    // console.log(index);
    // const action = {
    //   type: DELETE_ITEM,
    //   index
    // }
    const action = deleteItemAction(index);
    store.dispatch(action);
  }
}

export default TodoList;