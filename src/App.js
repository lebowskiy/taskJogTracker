import React, { Component, Fragment } from 'react';
import './App.scss';
import MenuBar from './components/primitive/menubar';
import ContentRoot from './components/complex/ContentRoot';

class App extends Component {
  render() {
    return (
      <Fragment>
      <MenuBar/>
      <ContentRoot/>
      </Fragment>
    );
  }
}

export default App;
