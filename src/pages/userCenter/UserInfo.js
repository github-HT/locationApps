import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CHeader from '../../components/CHeader';
import {connect} from 'react-redux';

export default connect(state => ({
  iconfont: state.styles.iconfont,
  fontColor: state.theme.ActiveThemeContent.fontColor,
  fontSize: state.styles.fontSize,
  padding: state.styles.padding,
  otherStyles: state.styles.otherStyles,
  background: state.theme.ActiveThemeContent.background,
}))(
  class About extends Component {
    constructor() {
      super();
      this.state = {};
    }
    render() {
      const {fontSize, iconfont, fontColor, padding, otherStyles, background} =
        this.props;
      return (
        <View style={[otherStyles.fillContent, background.default]}>
          <CHeader title="用户信息" />
          <ScrollView style={otherStyles.fillContent}>
            <View style={[padding.py_12]} />
          </ScrollView>
        </View>
      );
    }
  },
);
const styles = StyleSheet.create({});
