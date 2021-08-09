import {Link} from '@react-navigation/native';
import React, {Component} from 'react';
import {Alert, BackHandler, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import CryptoJS from 'crypto-js';
import {doLogin} from '../../api/api';
import {initDeviceId, setUserInfo} from '../../models/userModel';
import CHeader from '../../components/CHeader';

export default connect(state => ({
  background: state.theme.ActiveThemeContent.background,
  fontColor: state.theme.ActiveThemeContent.fontColor,
  padding: state.styles.padding,
  otherStyles: state.styles.otherStyles,
  fontSize: state.styles.fontSize,
  iconfont: state.styles.iconfont,
  button: state.styles.button,
}))(
  class Login extends Component {
    constructor() {
      super();
      this.state = {
        userName: {
          value: '',
        },
        password: {
          value: '',
        },
      };
    }
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

    doLogin = async () => {
      const userName = this.state.userName.value;
      const password = this.state.password.value;
      if (!userName || !password) {
        Alert.alert('提示', '用户名或密码不能为空！');
        return;
      }
      const data = {
        username: this.state.userName.value,
        password: CryptoJS.MD5(this.state.password.value).toString(),
        deviceId: await initDeviceId(),
        queryField: ['username'],
      };
      const res = await doLogin(data);
      console.log('doLogin', res?.data);
      if (res && res.data) {
        if (res.data.code === 0) {
          const userInfo = res.data.userInfo;
          setUserInfo({
            userName: userInfo.username,
            nickName: userInfo.nickname,
            uid: res.data.uid,
            tm: userInfo.register_date,
          });
          this.props.navigation.goBack();
        } else {
          Alert.alert('提示', `${res.data.code} ${res.data.msg}`);
        }
      }
    };

    setUserName = e => {
      console.log('setUserName', e);
      this.setState({
        userName: {
          value: e,
        },
      });
    };
    setPassword = e => {
      console.log('setPassword', e);
      this.setState({
        password: {
          value: e,
        },
      });
    };

    render() {
      const {
        background,
        otherStyles,
        fontColor,
        fontSize,
        padding,
        iconfont,
        button,
      } = this.props;
      return (
        <View style={[background.content, otherStyles.fillContent]}>
          <CHeader title="登录" />
          <ScrollView>
            <Input
              containerStyle={padding.pa_16}
              label="账号"
              labelStyle={[fontColor.title]}
              placeholder="请输入您的账号"
              placeholderTextColor={fontColor.body_3.color}
              keyboardType="email-address"
              onChangeText={this.setUserName}
            />

            <Input
              containerStyle={padding.pa_16}
              label="密码"
              labelStyle={[fontColor.title]}
              placeholder="请输入密码"
              placeholderTextColor={fontColor.body_3.color}
              keyboardType="default"
              secureTextEntry={true}
              onChangeText={this.setPassword}
            />
            <View
              style={[
                padding.pa_16,
                otherStyles.alignItemsEnd,
                fontColor.primary,
              ]}>
              <Link style={[fontColor.primary]} to={'/Register'}>
                没有账号？去注册吧
              </Link>
            </View>

            <View style={[padding.pa_16]}>
              <Button
                title="登录"
                titleStyle={[fontSize.large]}
                buttonStyle={[background.primary, button.large]}
                onPress={this.doLogin}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  },
);
