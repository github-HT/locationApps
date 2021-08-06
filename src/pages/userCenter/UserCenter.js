import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';

import {Avatar, ListItem, Button} from 'react-native-elements';
import {connect} from 'react-redux';
import {LogOut} from '../../models/userModel';

export default connect(state => ({
  ThemeType: state.theme.ThemeType,
  ActiveThemeContent: state.theme.ActiveThemeContent,
  padding: state.styles.padding,
  margin: state.styles.margin,
  fontSize: state.styles.fontSize,
  iconfont: state.styles.iconfont,
  fontWeight: state.styles.fontWeight,
  button: state.styles.button,
  isLogin: state.user.isLogin,
  userInfo: state.user.userInfo,
}))(
  class UserCenter extends Component {
    constructor(props) {
      super();
      this.state = {
        list: [
          [
            {
              title: '安全设置',
              icon: '\ue8af',
              style: [],
              onclick: () => {
                if (!this.props.isLogin) {
                  this.toLogin();
                  return;
                }
                this.props.navigation.push('Security');
              },
            },
            {
              title: '通用设置',
              icon: '\ue8b8',
              style: [],
              onclick: () => {
                this.props.navigation.push('OtherSetting');
              },
            },
          ],
          [
            {
              title: '关于我们',
              icon: '\ue8bd',
              style: [],
              onclick: () => {
                this.props.navigation.push('About');
              },
            },
            {
              title: '分享应用',
              icon: '\ue8b1',
              style: [],
              onclick: () => {
                this.props.navigation.push('ShareApps');
              },
            },
          ],
        ],
      };
    }
    toLogin = () => {
      this.props.navigation.push('Login', {});
    };
    toUserInfo = () => {
      if (!this.props.isLogin) {
        this.toLogin();
        return;
      }
      this.props.navigation.push('UserInfo', {});
    };

    doLogout = () => {
      Alert.alert('退出', '退出登录啦！');
      LogOut();
    };
    componentDidMount() {}

    render() {
      const {
        ActiveThemeContent,
        padding,
        fontSize,
        iconfont,
        fontWeight,
        button,
        isLogin,
        userInfo,
      } = this.props;
      const {background, fontColor} = ActiveThemeContent;
      return (
        <View style={[styles.fullScreen, background.default]}>
          <View style={[background.content, padding.pt_32]}>
            {/* <SafeAreaView style={padding.pb_0}> */}
            <ListItem
              activeOpacity={0.97}
              containerStyle={[padding.pa_24, padding.pt_24]}
              onPress={this.toUserInfo}>
              <Avatar
                size="medium"
                rounded
                title="H"
                titleStyle={fontColor.primary}
                overlayContainerStyle={background.level_2}
              />
              {isLogin ? (
                <ListItem.Content>
                  <ListItem.Title style={fontWeight.large}>
                    {userInfo.userName}
                  </ListItem.Title>
                  <ListItem.Subtitle style={fontSize.subTitle}>
                    UID:{userInfo.uid}
                  </ListItem.Subtitle>
                </ListItem.Content>
              ) : (
                <ListItem.Content>
                  <ListItem.Title style={fontWeight.large}>
                    未登录
                  </ListItem.Title>
                </ListItem.Content>
              )}
              <Text style={[iconfont.default, fontColor.body_4]}>
                {'\ue65b'}
              </Text>
            </ListItem>
            {/* </SafeAreaView> */}
          </View>
          <View style={[styles.fullScreen, background.default, padding.py_12]}>
            {this.state.list.map((it, idx) => {
              return (
                <View key={'View' + idx} style={[idx !== 0 && padding.pt_12]}>
                  {it.map((item, i) => (
                    <View key={i}>
                      <ListItem
                        activeOpacity={0.97}
                        containerStyle={[padding.pa_12, ...item.style]}
                        onPress={item.onclick}>
                        <Avatar
                          rounded
                          title={item.icon}
                          titleStyle={[fontColor.body, iconfont.default]}
                        />
                        <ListItem.Content>
                          <ListItem.Title style={fontSize.title}>
                            {item.title}
                          </ListItem.Title>
                        </ListItem.Content>
                        <Text style={[iconfont.default, fontColor.body_4]}>
                          {'\ue65b'}
                        </Text>
                      </ListItem>
                    </View>
                  ))}
                </View>
              );
            })}
            <View style={[padding.pa_12]}>
              {isLogin ? (
                <Button
                  title="退出登录"
                  titleStyle={fontSize.body}
                  buttonStyle={[background.primary, button.medium]}
                  onPress={this.doLogout}
                />
              ) : (
                <Button
                  title="去登录"
                  titleStyle={fontSize.body}
                  buttonStyle={[background.primary, button.medium]}
                  onPress={this.toLogin}
                />
              )}
            </View>
          </View>
        </View>
      );
    }
  },
);

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
});
