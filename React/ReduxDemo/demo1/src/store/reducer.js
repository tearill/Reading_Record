import { CHANGE_INPUT, ADD_ITEM, DELETE_ITEM, SET_LIST } from './actionTypes'

const defaultState = {
  inputValue: 'Write Something',
  list: [
    // '早8点开晨会，分配今天的代码任务',
    // '早9点和项目经理开需求沟通会',
    // '晚5点组织人员进行Review代码',
  ]
}

// reducer 必须是纯函数，数据变化只依赖于参数
export default (state = defaultState, action) => {
  console.log(state, action);
  // Reducer 里只能接收 state，不能改变 state
  if (action.type === CHANGE_INPUT) {
    // 改变
    let newState = JSON.parse(JSON.stringify(state));
    newState.inputValue = action.value;
    return newState;
  }

  if (action.type === ADD_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.push(newState.inputValue);
    newState.inputValue = ''; // 增加完把输入空置空
    return newState;
  }

  if (action.type === DELETE_ITEM) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list.splice(action.index, 1);
    return newState;
  }

  if (action.type === SET_LIST) {
    let newState = JSON.parse(JSON.stringify(state));
    newState.list = action.data.data.list;
    return newState;
  }

  return state
}