import * as React from 'react';
import {
  Button,
  Text,
  View,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import {MapView} from 'react-native-amap3d';

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    // backgroundColor: 'black',
    // color: 'white',
  },
  webviewStyle: {
    flex: 1,
    // backgroundColor: 'rgb(26, 35, 44)',
  },
  infoBox: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    paddingBottom: 0,
    flexDirection: 'row',
  },
  infoContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
    color: 'black',
  },
  text: {
    // color: '#74787c',
  },
});

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFixed: false,
      locationConfig: {
        accuracy: 14.317425727844238,
        altitude: 35.33,
        heading: 0,
        latitude: 31.153467626887036,
        longitude: 121.34737084388411,
        speed: 0,
        timestamp: 1627495097000,
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
  }

  mapViewRef = null;

  onLocation = location => {
    console.log(Platform.OS, location);
    if (this.mapViewRef) {
      this.setState({
        locationConfig: {
          accuracy: location.accuracy,
          altitude: location.altitude,
          heading: location.heading,
          latitude: location.latitude,
          longitude: location.longitude,
          speed: location.speed,
          timestamp: location.timestamp,
        },
      });
      if (!this.state.isFixed) {
        setTimeout(() => {
          this.setState({
            isFixed: true,
          });
          this.mapViewRef.setStatus(
            {
              tilt: 45,
              rotation: 90,
              zoomLevel: 18,
              center: {
                latitude: location.latitude,
                longitude: location.longitude,
              },
            },
            1000,
          );
        }, 0);
      }
    }
  };

  render() {
    return (
      <View style={styles.fullScreen}>
        <MapView
          ref={res => (this.mapViewRef = res)}
          style={styles.webviewStyle}
          locationEnabled
          showsLocationButton
          locationInterval={5000}
          onLocation={this.onLocation}
        />
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
          </View>
        </View>
      </View>
    );
  }
}
