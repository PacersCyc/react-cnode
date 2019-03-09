import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  inject,
  observer,
} from 'mobx-react';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
// import HomeIcon from 'material-ui-icons/Home'
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
}

@inject(stores => ({ appState: stores.appState })) @observer
class MainAppBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  constructor() {
    super();
    this.onHomeIconClick = this.onHomeIconClick.bind(this);
    this.createButtonClick = this.createButtonClick.bind(this);
    this.loginButtonClick = this.loginButtonClick.bind(this);
  }

  /* eslint-disable */
  onHomeIconClick() {
    this.context.router.history.push('/index');
  }

  createButtonClick() {

  }

  loginButtonClick() {
    if (this.props.appState.user.isLogin) {
      this.context.router.history.push('/user/info');
    } else {
      this.context.router.history.push('/user/login');
    }
  }
  /* eslint-enable */

  render() {
    const { classes, appState } = this.props;
    const { user } = appState;
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <ToolBar>
            <IconButton color="inherit" onClick={this.onHomeIconClick}>
              <HomeIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={classes.flex}>
              CNode
            </Typography>
            <Button raised="true" color="secondary" onClick={this.createButtonClick}>新建话题</Button>
            <Button color="inherit" onClick={this.loginButtonClick}>
              {user.isLogin ? user.info.loginname : '登录'}
            </Button>
          </ToolBar>
        </AppBar>
      </div>
    )
  }
}

MainAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

MainAppBar.wrappedComponent.propTypes = {
  appState: PropTypes.object.isRequired,
}

export default withStyles(styles)(MainAppBar);
