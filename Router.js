import React from 'react';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import Home from './src/components/Home';
import Gist from './src/components/Gist';

const RouterComponent = () => {
  return (
    <Router >
      <Scene key="root">
        <Scene key="gist" component={Gist} title="Access a gist repo" />
        <Scene key="home" component={Home} title="Main page" />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
