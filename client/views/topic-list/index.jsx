import React from 'react';
import {
  observer,
  inject,
} from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress'
// import Button from '@material-ui/core/Button';
// import AppState from '../../store/app-state';
import { AppState, TopicStore } from '../../store/store';

import Container from '../layout/container';
import TopicListItem from './list-item';

// const topic = {
//   title: 'this is title',
//   username: 'cyc',
//   reply_count: 10,
//   visit_count: 100,
//   create_at: '2019-03-20',
//   tab: 'share',
// };

@inject(stores => ({ appState: stores.appState, topicStore: stores.topicStore })) @observer
class TopicList extends React.Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 0,
    };
    this.changeTab = this.changeTab.bind(this);
    this.listItemClick = this.listItemClick.bind(this);
  }

  componentDidMount() {
    this.props.topicStore.fetchTopics();
  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3;
        resolve(true);
      });
    })
  }

  changeTab(e, index) {
    this.setState({
      tabIndex: index,
    })
  }

  /* eslint-disable */
  listItemClick() {

  }
  /* eslint-enable */

  render() {
    const {
      tabIndex,
    } = this.state;
    const {
      topicStore,
    } = this.props;
    const topicList = topicStore.topics;
    const syncingTopics = topicStore.syncing;

    return (
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={tabIndex} onChange={this.changeTab}>
          <Tab label="全部" />
          <Tab label="分享" />
          <Tab label="工作" />
          <Tab label="问答" />
          <Tab label="精品" />
          <Tab label="测试" />
        </Tabs>
        <List>
          {
            topicList.map(topic => (
              <TopicListItem onClick={this.listItemClick} topic={topic} key={topic.id} />
            ))
          }
        </List>
        {
          syncingTopics ? (
            <div>
              <CircularProgress color="secondary" size={100} />
            </div>
          ) : null
        }
      </Container>
    )
  }
}

TopicList.wrappedComponent.propTypes = {
  appState: PropTypes.instanceOf(AppState).isRequired,
  topicStore: PropTypes.instanceOf(TopicStore).isRequired,
};

export default TopicList;
