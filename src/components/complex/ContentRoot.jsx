import React, {Fragment,PureComponent} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom"; 
import Authorization from '../Authorization';
import JogTrackerMain from './JogTrackerMain';
import PageInfo from "./PageInfo";

class ContentRoot extends PureComponent {
  __renderRoutes = () => (
    <Switch>
      <Route exact path="/" component={Authorization} />
      <Route path="/userData" component={JogTrackerMain} />
      <Route path="/info" component={PageInfo} />
    </Switch>
  )
  
  render() {
    let needToken = localStorage['authToken'];
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