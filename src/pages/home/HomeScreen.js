import * as React from 'react';
import {
  View,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  BackHandler,
  Text,
} from 'react-native';

import BackHome from '../../models/BackHome';
import LocationMap from '../map/LocationMap';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import UserCenter from '../userCenter/UserCenter';
import {connect} from 'react-redux';
import RNBootSplash from 'react-native-bootsplash';

const Tab = createMaterialBottomTabNavigator();

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});

export default connect(state => ({
  ActiveThemeContent: state.theme.ActiveThemeContent,
  iconfont: state.styles.iconfont,
  fontSize: state.styles.fontSize,
  otherStyles: state.styles.otherStyles,
}))(
  class HomeScreen extends React.Component {
    constructor(props) {
      super(props);

      // 动态获取定位权限
      if (Platform.OS === 'android') {
        PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);
      }

      RNBootSplash.hide({fade: true});
    }

    componentDidMount() {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        this.backAction,
      );
    }

    componentWillUnmount() {
      this.backHandler.remove();
    }

    backAction = () => {
      BackHome.go();
      return true;
    };

    render() {
      const {ActiveThemeContent, iconfont, fontSize, otherStyles} = this.props;
      const {background, fontColor} = ActiveThemeContent;
      return (
        <Tab.Navigator
          initialRouteName="LocationMap"
          labeled={true}
          activeColor={fontColor.primary.color}
          inactiveColor={fontColor.body_3.color}
          screenOptions={({route}) => ({
            tabBarIcon: ({color, focused}) => {
              const Icons = {
                LocationMap: '\ue8ae', //require('../../assets/img/location.png'),
                Discovery: '\ue8b9', //require('../../assets/img/home.png'),
                UserCenter: '\ue7ae', //require('../../assets/img/user.png'),
              };
              return (
                <Text
                  style={[
                    iconfont.default,
                    fontSize.xxlarge,
                    focused ? fontColor.primary : fontColor.body_3,
                  ]}>
                  {Icons[route.name]}
                </Text>
              );
            },
          })}
          style={[{height: 50}]}
          barStyle={[background.content]}>
          <Tab.Screen
            name="LocationMap"
            iconkey="home"
            component={LocationMap}
            options={{
              title: '首页',
            }}
          />
          {/* <Tab.Screen
              name="Discovery"
              component={DiscoveryScreen}
              options={{
                title: '发现',
              }}
            /> */}
          <Tab.Screen
            name="UserCenter"
            iconkey="home"
            component={UserCenter}
            options={{
              title: '我的',
            }}
          />
        </Tab.Navigator>
      );
    }
  },
);
