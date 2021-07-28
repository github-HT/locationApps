import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export class DiscoveryScreen extends React.Component {
  style = StyleSheet.create({
    fullScreen: {
      flex: 1,
    },
    pt200: {
      paddingTop: 200,
    },
  });
  render() {
    return (
      <View>
        <Text style={this.style.pt200}>DiscoveryScreen</Text>
      </View>
    );
  }
}
