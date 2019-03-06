import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader'; //eslint-disable-line
import App from './views/App';

// ReactDOM.render(<App />, document.getElementById('root'));

// react新版本更新后开启服务端渲染推荐的新方法hydrate
// ReactDOM.hydrate(<App />, document.getElementById('root'));

const root = document.getElementById('root');
const render = (Component) => {
  ReactDOM.hydrate(
    <AppContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </AppContainer>,
    root,
  )
}

render(App);

if (module.hot) {
  module.hot.accept('./views/App.jsx', () => {
    const NextApp = require('./views/App.jsx').default;  //eslint-disable-line
    render(NextApp);
  })
}
