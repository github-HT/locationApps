import * as React from 'react';

import {Platform, UIManager} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/index';
import Index from './pages/Index';
import {initLocalStorage} from './models/userModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    // AsyncStorage.clear();
    store.dispatch({
      type: 'SET_THEME',
      ThemeType: 'light',
    });
    initLocalStorage();
  }
  render() {
    const {} = store.getState();
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

export default App;
