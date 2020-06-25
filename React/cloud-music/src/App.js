// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { IconStyle } from './assets/iconfont/iconfont';
import { GlobalStyle } from './style';
import { renderRoutes } from 'react-router-config'; // 读取路由配置并转换为对应 Route 标签
import routes from './routes/index.js';
import store from './store/index';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        {/* <i className="iconfont">&#xe62b;</i> */}
        {renderRoutes(routes)}
      </HashRouter>
    </Provider>
  );
}

export default App;
