import React from 'react';
// import { Link } from 'react-router-dom';
import Routes from '../config/router';

import AppBar from './layout/app-bar';

export default class App extends React.Component {
  componentDidMount() {
    // do something
  }

  render() {
    return [
      // <div key="navs">
      //   <Link to="/">首页</Link>
      //   <Link to="/detail">详情页</Link>
      //   <Link to="/test">测试</Link>
      // </div>,
      <AppBar key="appbar" />,
      <Routes key="routes" />,
    ]
  }
}
