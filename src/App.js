import * as React from 'react';

import {Platform, UIManager} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/index';
import Index from './pages/Index';

store.dispatch({
  type: 'SET_THEME',
  ThemeType: 'light',
});

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
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
