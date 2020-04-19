import { takeEvery, put } from 'redux-saga/effects';
import { GET_MY_LIST } from './actionTypes';
import { setListAction } from './actionCreators';
import axios from 'axios';

// generator
function* mySage() {
  yield takeEvery(GET_MY_LIST, getList);
}

function* getList() {
  // console.log('------Horace');
  // axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList')
  //   .then(res => {
  //     const data = res.data
  //     // console.log(data, '--------');
  //     const action = setListAction(data);
  //     put(action);
  //   })
  const res = yield axios.get('https://www.easy-mock.com/mock/5cfcce489dc7c36bd6da2c99/xiaojiejie/getList');
  const action = setListAction(res.data);
  yield put(action);
}

export default mySage;