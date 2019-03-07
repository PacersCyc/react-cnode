import React from 'react';
import {
  observer,
  inject,
} from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import AppState from '../../store/app-state';

@inject('appState') @observer
class TopicList extends React.Component {
  constructor() {
    super();
    this.changeName = this.changeName.bind(this);
  }

  componentDidMount() {
    // do something
  }

  bootstrap() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3;
        resolve(true);
      });
    })
  }

  changeName(e) {
    this.props.appState.changeName(e.target.value); // eslint-disable-line
  }

  render() {
    const { appState } = this.props;
    const { msg } = appState;
    return (
      <div>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <input type="text" onChange={this.changeName} />
        <span>{msg}</span>
      </div>
    )
  }
}

export default TopicList;

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
