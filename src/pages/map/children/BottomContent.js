import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';

export default class BottomContent extends Component {
  render() {
    return (
      <View style={styles.infoBox}>
        <View style={styles.infoContent}>
          <View style={styles.infoContentItem}>
            <Text style={styles.infoContentItemText}>
              {this.props.locationConfig.longitude}
            </Text>
            <Text style={styles.text}>当前经度</Text>
          </View>
          <View style={styles.infoContentItem}>
            <Text style={styles.infoContentItemText}>
              {this.props.locationConfig.latitude}
            </Text>
            <Text style={styles.text}>当前纬度</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    flex:1,
  },
});
