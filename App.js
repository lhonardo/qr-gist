import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { Scene, Router, Actions, Stack } from 'react-native-router-flux';
import Home from './src/components/Home';
import Gist from './src/components/Gist';

class App extends React.Component {
  render() {
    const store = createStore(reducers, {}, composeWithDevTools(
      applyMiddleware(ReduxThunk)
    ));

    const scenes = Actions.create(
      <Scene key="root">
        <Scene key="home" component={Home} title="Main page" />
        <Scene key="gist" component={Gist} title="Access a gist repo" />
      </Scene>
    );

    return (
      <Provider store={store}>
        <Router scenes={scenes}/>
      </Provider>
    );
  }
}

export default App;
