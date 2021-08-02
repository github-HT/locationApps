import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './home/HomeScreen';
import Login from './login/Login';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
const Stack = createNativeStackNavigator();

import UserInfo from './userCenter/UserInfo';
import {connect} from 'react-redux';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            stackAnimation: 'slide_from_right',
            statusBarTranslucent: true,
            statusBarStyle: 'dark',
            statusBarColor: 'transparent',
            headerHideShadow: true,
            headerBackTitleVisible: false,
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
          <Stack.Screen name="UserInfo" component={UserInfo} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(state => ({
  iconfont: state.styles.iconfont,
}))(Index);
