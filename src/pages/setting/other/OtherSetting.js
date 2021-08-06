import React, {Component} from 'react';
import {Text, StyleSheet, View, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CHeader from '../../../components/CHeader';
import {ListItem} from 'react-native-elements';
import {connect} from 'react-redux';

export default connect(state => ({
  iconfont: state.styles.iconfont,
  fontColor: state.theme.ActiveThemeContent.fontColor,
  fontSize: state.styles.fontSize,
  padding: state.styles.padding,
  otherStyles: state.styles.otherStyles,
  background: state.theme.ActiveThemeContent.background,
}))(
  class OtherSetting extends Component {
    constructor() {
      super();
      this.state = {
        list: [
          {
            title: '语言',
            icon: '\ue8af',
            style: [],
            onclick: () => {
              // this.props.navigation.push('Security');
              Alert.alert('提示', '暂未开放！');
            },
          },
          {
            title: '主题',
            icon: '\ue8b8',
            style: [],
            onclick: () => {
              // this.props.navigation.push('OtherSetting');
              Alert.alert('提示', '暂未开放！');
            },
          },
        ],
      };
    }
    render() {
      const {fontSize, iconfont, fontColor, padding, otherStyles, background} =
        this.props;
      return (
        <View style={[otherStyles.fillContent, background.default]}>
          <CHeader title="通用设置" />
          <ScrollView style={otherStyles.fillContent}>
            <View style={[padding.py_12]}>
              {this.state.list.map((item, i) => (
                <ListItem
                  key={i}
                  onPress={item.onclick}
                  containerStyle={[background.content]}>
                  <ListItem.Content>
                    <ListItem.Title style={[fontSize.title, fontColor.title]}>
                      {item.title}
                    </ListItem.Title>
                  </ListItem.Content>
                  <Text style={[iconfont.default, fontColor.body_4]}>
                    {'\ue65b'}
                  </Text>
                </ListItem>
              ))}
            </View>
          </ScrollView>
        </View>
      );
    }
  },
);
const styles = StyleSheet.create({});
