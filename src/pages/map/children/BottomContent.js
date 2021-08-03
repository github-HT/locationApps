import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';

export default connect(state => ({
  background: state.theme.ActiveThemeContent.background,
  fontColor: state.theme.ActiveThemeContent.fontColor,
  padding: state.styles.padding,
  borderRadius: state.styles.borderRadius,
  fontSize: state.styles.fontSize,
}))(
  class BottomContent extends Component {
    render() {
      const {background, borderRadius, padding, fontColor, fontSize} =
        this.props;
      return (
        <View style={[styles.infoBox, padding.pa_12]}>
          <View
            style={[
              styles.infoContent,
              background.content,
              padding.pa_16,
              borderRadius.top_large,
            ]}>
            <View style={[styles.infoContentItem, padding.py_8]}>
              <Text style={[styles.text, fontColor.body_2, fontSize.body]}>
                经度
              </Text>
              <Text
                style={[
                  styles.infoContentItemText,
                  fontColor.title,
                  fontSize.xlarge,
                ]}>
                {this.props.locationConfig.longitude}
              </Text>
            </View>
            <View style={[styles.infoContentItem, padding.py_8]}>
              <Text style={[styles.text, fontColor.body_2, fontSize.body]}>
                纬度
              </Text>
              <Text
                style={[
                  styles.infoContentItemText,
                  fontColor.title,
                  fontSize.xlarge,
                ]}>
                {this.props.locationConfig.latitude}
              </Text>
            </View>
            <View style={[styles.infoContentItem, padding.py_8]}>
              <Text style={[styles.text, fontColor.body_2, fontSize.body]}>
                海拔
              </Text>
              <Text
                style={[
                  styles.infoContentItemText,
                  fontColor.title,
                  fontSize.xlarge,
                ]}>
                {this.props.locationConfig.altitude}
              </Text>
            </View>

            <View style={[styles.infoContentItem, padding.py_8]}>
              <Text style={[styles.text, fontColor.body_2, fontSize.body]}>
                速度
              </Text>
              <Text
                style={[
                  styles.infoContentItemText,
                  fontColor.title,
                  fontSize.xlarge,
                ]}>
                {this.props.locationConfig.speed}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  },
);

const styles = StyleSheet.create({
  infoBox: {
    position: 'absolute',
    bottom: 0,
    paddingBottom: 0,
    flexDirection: 'row',
  },
  infoContent: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flex: 1,
  },
  infoContentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  infoContentItemText: {},
});
