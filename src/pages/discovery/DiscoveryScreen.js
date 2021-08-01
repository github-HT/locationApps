import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export class DiscoveryScreen extends React.Component {
  style = StyleSheet.create({
    fullScreen: {
      flex: 1,
    },
  });
  render() {
    return (
      <SafeAreaView>
        <Text>DiscoveryScreen</Text>
      </SafeAreaView>
    );
  }
}
