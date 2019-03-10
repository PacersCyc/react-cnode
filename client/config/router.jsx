import React from 'react';
import {
  Route,
  Redirect,
} from 'react-router-dom'

import TopicList from '../views/topic-list/index';
import TopicDetail from '../views/topic-detail/index';
import TopicCreate from '../views/topic-create/index';
import UserLogin from '../views/user/login';
import UserInfo from '../views/user/info';
import TestApi from '../views/test/api-test';

export default () => [
  <Route path="/" render={() => <Redirect to="/list" />} key="/" exact />,
  <Route path="/index" component={TopicList} exact key="index" />,
  <Route path="/list" component={TopicList} key="list" />,
  <Route path="/detail/:id" component={TopicDetail} key="detail" />,
  <Route path="/user/login" component={UserLogin} key="login" />,
  <Route path="/user/info" component={UserInfo} key="info" />,
  <Route path="/topic/create" component={TopicCreate} key="create" />,
  <Route path="/test" component={TestApi} key="test" />,
]
