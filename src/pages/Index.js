import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './home/HomeScreen';
import Login from './login/Login';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
const Stack = createNativeStackNavigator();

import UserInfo from './userCenter/UserInfo';
import {connect} from 'react-redux';
import About from './userCenter/About';
import Security from './setting/security/Security';
import OtherSetting from './setting/other/OtherSetting';
import ShareApps from './userCenter/ShareApps';

import Register from './login/Register';

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
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              title: '登录',
            }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="UserInfo" component={UserInfo} />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              title: '关于我们',
            }}
          />
          <Stack.Screen
            name="Security"
            component={Security}
            options={{
              title: '安全设置',
            }}
          />
          <Stack.Screen
            name="OtherSetting"
            component={OtherSetting}
            options={{
              title: '通用设置',
            }}
          />
          <Stack.Screen
            name="ShareApps"
            component={ShareApps}
            options={{
              title: '应用分享',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(state => ({
  iconfont: state.styles.iconfont,
}))(Index);
