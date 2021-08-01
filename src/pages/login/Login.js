import React, {Component} from 'react';
import {Text, StyleSheet, View, Button, BackHandler} from 'react-native';

export default class Login extends Component {
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
    this.props.navigation.goBack();
    return true;
  };

  toDiscovery = () => {
    this.props.navigation.navigate({name: 'LocationMap', params: {}});
  };

  render() {
    return (
      <View>
        <Text> 登录 </Text>
        <Button title="去发现" onPress={this.toDiscovery} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
