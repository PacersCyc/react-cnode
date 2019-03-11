import React from 'react';
import {
  observer,
  inject,
} from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import queryString from 'query-string';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress'
// import Button from '@material-ui/core/Button';
// import AppState from '../../store/app-state';
import { AppState, TopicStore } from '../../store/store';

import Container from '../layout/container';
import TopicListItem from './list-item';
import { tabs } from '../../utils/variable-define';

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
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super();
    this.changeTab = this.changeTab.bind(this);
    this.listItemClick = this.listItemClick.bind(this);
  }

  componentDidMount() {
    const tab = this.getTab();
    this.props.topicStore.fetchTopics(tab);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.props.topicStore.fetchTopics(this.getTab(nextProps.location.search));
    }
  }

  getTab(search) {
    search = search || this.props.location.search;
    const query = queryString.parse(search);
    return query.tab || 'all';
  }

  bootstrap() {
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     this.props.appState.count = 3;
    //     resolve(true);
    //   });
    // })
    const query = queryString.parse(this.props.location.search);
    const { tab } = query;
    return this.props.topicStore.fetchTopics(tab || 'all')
      .then(() => true)
      .catch(() => false)
  }

  changeTab(e, value) {
    this.context.router.history.push({
      pathname: '/index',
      search: `?tab=${value}`,
    })
  }

  listItemClick(topic) {
    this.context.router.history.push(`/detail/${topic.id}`);
  }

  render() {
    const {
      topicStore,
      appState,
    } = this.props;
    const { user } = appState;
    const topicList = topicStore.topics;
    const { createdTopics } = topicStore;
    const syncingTopics = topicStore.syncing;

    return (
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Tabs value={this.getTab()} onChange={this.changeTab}>
          {
            Object.keys(tabs).map(tabName => (
              <Tab label={tabs[tabName]} value={tabName} key={tabName} />
            ))
          }
        </Tabs>
        {
          createdTopics.length > 0
            ? (
              <List style={{ backgroundColor: '#dfdfdf' }}>
                {
                  createdTopics.map((topic) => {
                    topic = Object.assign({}, topic, {
                      author: user.info,
                    });
                    return (
                      <TopicListItem
                        onClick={() => { this.listItemClick(topic) }}
                        topic={topic}
                        key={topic.id}
                      />
                    )
                  })
                }
              </List>
            )
            : null
        }

        <List>
          {
            topicList.map(topic => (
              <TopicListItem
                onClick={() => { this.listItemClick(topic) }}
                topic={topic}
                key={topic.id}
              />
            ))
          }
        </List>
        {
          syncingTopics ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '40px 0',
              }}
            >
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

TopicList.propTypes = {
  location: PropTypes.object.isRequired,
};

export default TopicList;
