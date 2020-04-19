import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';
// import thunk from 'redux-thunk';
import createSageMiddleware from 'redux-saga';
import mySages from './sagas';

// compose 增强函数组合多个中间件
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const sageMiddleware = createSageMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

// const enhancer = composeEnhancers(applyMiddleware(thunk));
const enhancer = composeEnhancers(applyMiddleware(sageMiddleware));

// store 是唯一的
const store = createStore(reducer, enhancer);
sageMiddleware.run(mySages);

export default store;