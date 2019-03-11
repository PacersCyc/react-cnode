import React from 'react';
import PropTypes from 'prop-types';
import {
  inject,
  observer,
} from 'mobx-react';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom'

import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';
import TopicCreate from '../views/topic-create/index';
import UserLogin from '../views/user/login';
import UserInfo from '../views/user/info';
import TestApi from '../views/test/api-test';

const PrivateRoute = ({ isLogin, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      isLogin
        ? <Component {...props} />
        : (
          <Redirect
            to={{
              pathname: '/user/login',
              search: `?from=${rest.path}`,
            }}
          />
        )
    )}
  />
)

const InjectedPrivateRoute = withRouter(inject(stores => ({
  isLogin: stores.appState.user.isLogin,
}))(observer(PrivateRoute)));

PrivateRoute.propTypes = {
  isLogin: PropTypes.bool,
  component: PropTypes.element.isRequired,
}

PrivateRoute.defaultProps = {
  isLogin: false,
}

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} key="/" exact />,
  <Route path="/index" component={TopicList} exact key="index" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/user/login" component={UserLogin} key="login" />,
  // <Route path="/user/info" component={UserInfo} key="info" />,
  // <Route path="/topic/create" component={TopicCreate} key="create" />,
  <Route path="/test" component={TestApi} key="test" />,
  <InjectedPrivateRoute path="/user/info" component={UserInfo} key="info" />,
  <InjectedPrivateRoute path="/topic/create" component={TopicCreate} key="create" />,
]
