import * as React from 'react';
import {
  View,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  StatusBar,
  BackHandler,
  Image,
} from 'react-native';

import BackHome from '../../components/BackHome';
import {DiscoveryScreen} from '../discovery/DiscoveryScreen';
import {LocationMap} from '../map/LocationMap';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserCenter from '../userCenter/UserCenter';
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  iconStyle: {
    height: 30,
    width: 30,
  },
});

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    // 动态获取定位权限
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
    }
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
    return (
      <View style={styles.fullScreen}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <Tab.Navigator
          tabBarOptions={{
            showLabel: false,
          }}
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size, focused}) => {
              const Icons = {
                LocationMap: require('../../assets/img/location.png'),
                Discovery: require('../../assets/img/home.png'),
                UserCenter: require('../../assets/img/user.png'),
              };
              const FocusIcons = {
                LocationMap: require('../../assets/img/location-active.png'),
                Discovery: require('../../assets/img/home-active.png'),
                UserCenter: require('../../assets/img/user-active.png'),
              };
              return (
                <Image
                  style={styles.iconStyle}
                  source={focused ? FocusIcons[route.name] : Icons[route.name]}
                />
              );
            },
          })}>
          <Tab.Screen
            name="LocationMap"
            iconkey="home"
            component={LocationMap}
            options={{
              title: '首页',
            }}
          />
          <Tab.Screen
            name="Discovery"
            component={DiscoveryScreen}
            options={{
              title: '发现',
            }}
          />
          <Tab.Screen
            name="UserCenter"
            iconkey="home"
            component={UserCenter}
            options={{
              title: '我的',
            }}
          />
        </Tab.Navigator>
      </View>
    );
  }
}
