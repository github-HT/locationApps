import * as React from 'react';
import {
  View,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  BackHandler,
  Image,
  Text,
} from 'react-native';

import BackHome from '../../components/BackHome';
import {DiscoveryScreen} from '../discovery/DiscoveryScreen';
import {LocationMap} from '../map/LocationMap';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserCenter from '../userCenter/UserCenter';
import {connect} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  // iconStyle: {
  //   height: 30,
  //   width: 30,
  // },
  iconStyle: {
    fontFamily: 'iconfont',
    fontSize: 30,
    marginTop: 10,
    marginLeft: 10,
  },
});

export default connect(state => ({
  ActiveThemeContent: state.theme.ActiveThemeContent,
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
      const {ActiveThemeContent} = this.props;
      return (
        <View style={styles.fullScreen}>
          <Tab.Navigator
            tabBarOptions={{
              showLabel: false,
            }}
            screenOptions={({route}) => ({
              tabBarIcon: ({color, size, focused}) => {
                const Icons = {
                  LocationMap: '\ue8ae', //require('../../assets/img/location.png'),
                  Discovery: '\ue8b9', //require('../../assets/img/home.png'),
                  UserCenter: '\ue7ae', //require('../../assets/img/user.png'),
                };
                return (
                  <Text
                    style={[
                      styles.iconStyle,
                      focused ? ActiveThemeContent.font.primary : {},
                    ]}>
                    {Icons[route.name]}
                  </Text>
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
  },
);
