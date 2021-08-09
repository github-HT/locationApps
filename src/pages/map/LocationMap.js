import React, {Component} from 'react';
import {Text, StyleSheet, View, Platform} from 'react-native';

import {MapView} from 'react-native-amap3d';
import {connect} from 'react-redux';
import {locationUpload} from '../../api/api';
import ButtonContent from './children/BottomContent';

export default connect(state => ({
  isLogin: state.user.isLogin,
  userInfo: state.user.userInfo,
}))(
  class LocationMap extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isFixed: false,
        locationConfig: {
          accuracy: 0,
          altitude: 0,
          heading: 0,
          latitude: 0,
          longitude: 0,
          speed: 0,
          timestamp: 0,
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

    historyLocationList = [];
    lastUploadTm = 0;

    onLocation = location => {
      const {isLogin, userInfo} = this.props;
      console.log(Platform.OS, location);
      if (this.mapViewRef) {
        const locationInfo = {
          accuracy: location.accuracy || this.state.locationConfig.accuracy,
          altitude: location.altitude || this.state.locationConfig.altitude,
          heading: location.heading || this.state.locationConfig.heading,
          latitude: location.latitude || this.state.locationConfig.latitude,
          longitude: location.longitude || this.state.locationConfig.longitude,
          speed: location.speed || this.state.locationConfig.speed,
          timestamp: location.timestamp || this.state.locationConfig.timestamp,
        };
        this.setState({locationConfig: locationInfo});
        const tm = Date.now();
        const diffTm = tm - this.lastUploadTm;
        const upload = diffTm > 10 * 1000;
        const len = this.historyLocationList.length > 0;
        console.log('upload tm ', upload, isLogin, len);
        if (isLogin && upload && len) {
          this.lastUploadTm = tm;
          locationUpload({
            locationArr: [locationInfo], //this.historyLocationList,
            uid: userInfo.uid,
          })
            .then(res => {
              console.log('locationUpload', res.data);
            })
            .catch(error => {
              console.log('locationUpload catch err', error);
            });
        } else if (isLogin) {
          this.historyLocationList.push(locationInfo);
        }

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
                  latitude:
                    location.latitude || this.state.locationConfig.latitude,
                  longitude:
                    location.longitude || this.state.locationConfig.longitude,
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
          <ButtonContent locationConfig={this.state.locationConfig} />
        </View>
      );
    }
  },
);
const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  webviewStyle: {
    flex: 1,
  },
});
