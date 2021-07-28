import * as React from 'react';
import {
  Button,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import {init, Geolocation} from 'react-native-amap-geolocation';
import {WebView} from 'react-native-webview';

// import styles from './Homescreen.module.css';
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
  },
  webviewStyle: {
    flex: 1,
  },
  infoBox: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    flexDirection: 'row',
  },
  infoContent: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
  },
  infoContentItem: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  infoContentItemText: {
    fontSize: 30,
    color: 'white',
  },
  text: {
    color: '#74787c',
  },
});

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationConfig: {
        accuracy: 5,
        altitude: 0,
        altitudeAccuracy: null,
        heading: undefined,
        latitude: 0,
        longitude: 0,
        speed: -1,
      },
    };
    // {
    //   speed: -1, // 速度
    //   longitude: -0.1337, // 经度
    //   latitude: 51.50998, // 纬度
    //   accuracy: 5, // 精度
    //   heading: -1, // 航向
    //   altitude: 0, // 海拔
    //   altitudeAccuracy: -1, // 海拔精度
    //   floor: 0, // 楼层
    //   timestamp: 1446007304457.029, // 时间戳
    //   fromMockProvider: false,
    // };

    this.geolocation();
  }

  async geolocation() {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ]);
    }

    await init({
      ios: '9ccfb0050cddcfb7b221af181e7071d9',
      android: '07ff3de85d9af09e6304f48340b1ee9c',
    });

    Geolocation.getCurrentPosition(
      ({coords}) => {
        console.log(Platform.OS, 'Geolocation', coords);
        this.setState({
          locationConfig: {
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            latitude: coords.latitude,
            longitude: coords.longitude,
            speed: coords.speed,
          },
        });
      },
      error => {
        console.log(Platform.OS, '获取定位失败', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      },
    );
    Geolocation.watchPosition(
      ({coords}) => {
        console.log(
          Platform.OS,
          'watchPosition Geolocation',
          coords,
          typeof coords,
        );
        this.setState({
          locationConfig: {
            accuracy: coords.accuracy,
            altitude: coords.altitude,
            altitudeAccuracy: coords.altitudeAccuracy,
            heading: coords.heading,
            latitude: coords.latitude,
            longitude: coords.longitude,
            speed: coords.speed,
          },
        });
      },
      error => {
        console.log(Platform.OS, 'watchPosition 获取定位失败', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      },
    );
  }

  render() {
    // const source = (Platform.OS == 'ios') ? require('./pages/hybird/html/map/index.html') : { uri: 'file:///android_asset/pages/hybird/html/map/index.html' }
    const source = {uri: 'https://github-ht.github.io/map/'};
    return (
      <View style={styles.fullScreen}>
        <WebView source={source} style={styles.webviewStyle} />
        <View style={styles.infoBox}>
          <View style={styles.infoContent}>
            <View style={styles.infoContentItem}>
              <Text style={styles.infoContentItemText}>
                {this.state.locationConfig.longitude}
              </Text>
              <Text style={styles.text}>当前经度</Text>
            </View>
            <View style={styles.infoContentItem}>
              <Text style={styles.infoContentItemText}>
                {this.state.locationConfig.latitude}
              </Text>
              <Text style={styles.text}>当前纬度</Text>
            </View>
            {/* <Text style={styles.text}>
              <Text>经度: {this.locationConfig.longitude}</Text>
              <Text>纬度: {this.locationConfig.latitude}</Text>
              <Text>海拔: {this.locationConfig.altitude}</Text>
              <Text>楼层: {this.locationConfig.floor}</Text>
              <Text>时间: {this.locationConfig.timestamp}</Text>
              <Text>速度: {this.locationConfig.speed}</Text>
              <Text>方向: {this.locationConfig.heading}</Text>
            </Text> */}
          </View>
        </View>
      </View>
    );
  }
}
