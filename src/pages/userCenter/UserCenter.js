import React, {Component} from 'react';
import {Text, StyleSheet, View, StatusBar} from 'react-native';

import {Header, Button} from 'react-native-elements';

export default class UserCenter extends Component {
  toLogin = () => {
    const {navigate} = this.props.navigation;
    console.log('去登录');
    navigate('Login', {
      itemId: 86,
      otherParam: 'anything you want here',
    });
  };

  render() {
    return (
      <View>
        <Header centerComponent={{text: '用户中心'}} />
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <View>
          <Button title="去登录" onPress={this.toLogin} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    paddingTop: 100,
  },
});
