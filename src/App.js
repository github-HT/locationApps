import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './pages/home/HomeScreen';
import Login from './pages/login/Login';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
const Stack = createNativeStackNavigator();

import {Platform, UIManager} from 'react-native';
import {Provider} from 'react-redux';
import store from './store/index';

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
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              stackAnimation: 'slide_from_right',
              statusBarTranslucent: true,
              statusBarStyle: 'dark',
              statusBarColor: 'transparent',
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: '',
                headerShown: false,
                headerStatusBarHeight: 0,
              }}
            />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
