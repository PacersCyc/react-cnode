import React from 'react';
import {
  observer,
  inject,
} from 'mobx-react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Button from '@material-ui/core/Button';
import AppState from '../../store/app-state';

import Container from '../layout/container';

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
      <Container>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <Button raised color="primary">touch</Button>
        <input type="text" onChange={this.changeName} />
        <span>{msg}</span>
      </Container>
    )
  }
}

export default TopicList;

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}
