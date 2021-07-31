import React, {Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';

import {Header, Button} from 'react-native-elements';
import Animateds from './children/Animateds';

export default class UserCenter extends Component {
  toLogin = () => {
    this.props.navigation.push('Login', {});
  };

  render() {
    return (
      <View style={styles.fullScreen}>
        <Header
          backgroundColor={'transparent'}
          centerComponent={{text: '用户中心', style: styles.headerCenterText}}
        />
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <View style={styles.fullScreen}>
          <Button title="去登录" onPress={this.toLogin} />
          <Animateds />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  headerCenterText: {
    fontSize: 17,
    fontWeight: '600',
  },
});
