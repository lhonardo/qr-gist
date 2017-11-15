import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { StatusBar, View, Text } from 'react-native'
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Scene, Router, NavBar, Actions, Stack } from 'react-native-router-flux';
import Home from './src/components/Home';
import Gist from './src/components/Gist';
import Login from './src/components/Login';

class App extends React.Component {
  render() {
    const store = createStore(reducers, {}, composeWithDevTools(
      applyMiddleware(ReduxThunk)
    ));

    const scenes = Actions.create(
      <Scene key="root">
        <Scene key="home" initial={true} component={Home} title="QRCode Gist Comment" />
        <Scene key="gist" component={Gist} title="Gist Repository" />
        <Scene key="login" component={Login} title="Login" />
      </Scene>
    );

    return (
      <Provider store={store} >
        <Router scenes={scenes}/>
      </Provider>
    );
  }
}

export default App;
