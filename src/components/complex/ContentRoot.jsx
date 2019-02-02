import React, {Fragment,PureComponent} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom"; 
import Authorization from '../Authorization';
import JogTrackerMain from './JogTrackerMain';

class ContentRoot extends PureComponent {
  state = {
    needToken: false,
  }
  __renderRoutes = () => (
    <Switch>
      <Route exact path="/" component={Authorization} />
      <Route path="/userData" component={JogTrackerMain} />
    </Switch>
  )
  
  render() {
    const needToken = JSON.parse(localStorage['authToken']);
    return (
      <Fragment>
      {
        !needToken && <Redirect to="/"/>
      }
      {this.__renderRoutes()}
      </Fragment>
    )
  }
};
export default withRouter(ContentRoot);