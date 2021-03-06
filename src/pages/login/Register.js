import React, {Component} from 'react';
import {View, BackHandler, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {doRegister} from '../../api/api';
import CHeader from '../../components/CHeader';
import CryptoJS from 'crypto-js';
import {setUserInfo} from '../../models/userModel';

export default connect(state => ({
  background: state.theme.ActiveThemeContent.background,
  fontColor: state.theme.ActiveThemeContent.fontColor,
  padding: state.styles.padding,
  otherStyles: state.styles.otherStyles,
  fontSize: state.styles.fontSize,
  iconfont: state.styles.iconfont,
  button: state.styles.button,
}))(
  class Register extends Component {
    constructor() {
      super();
      this.state = {
        userName: {
          value: '',
        },
        password: {
          value: '',
        },
        confirmPassword: {
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
      this.props.navigation.goBack(-2);
      return true;
    };

    doRegister = async () => {
      console.log(
        'do Register',
        this.state.userName,
        this.state.password,
        this.state.confirmPassword,
      );
      const userName = this.state.userName.value;
      const password = this.state.password.value;
      const confirmPassword = this.state.confirmPassword.value;
      if (password !== confirmPassword) {
        return;
      }

      const res = await doRegister({
        username: userName,
        nickname: userName,
        password: CryptoJS.MD5(password).toString(),
        pwd2: CryptoJS.MD5(confirmPassword).toString(),
      });
      if (res && res.data) {
        if (res.data.code === 0) {
          Alert.alert('提示', '注册成功啦！');
          this.props.navigation.navigate('UserCenter');
          const userInfo = res.data.userInfo;
          // 存储并设置用户信息
          setUserInfo({
            userName: userInfo.username,
            nickName: userInfo.nickname,
            uid: res.data.uid,
            tm: userInfo.register_date,
          });
        } else {
          Alert.alert('提示', res.data.code + ' ' + res.data.msg);
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

    setConfirmPassword = e => {
      this.setState({
        confirmPassword: {
          value: e,
        },
      });
    };

    render() {
      const {background, otherStyles, fontColor, fontSize, padding, button} =
        this.props;
      return (
        <View style={[background.content, otherStyles.fillContent]}>
          <CHeader title="注册" />
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

            <Input
              containerStyle={padding.pa_16}
              label="确认密码"
              labelStyle={[fontColor.title]}
              placeholder="请再次输入密码"
              placeholderTextColor={fontColor.body_3.color}
              keyboardType="default"
              secureTextEntry={true}
              onChangeText={this.setConfirmPassword}
            />

            <View style={[padding.pa_16]}>
              <Button
                title="提交"
                titleStyle={[fontSize.large]}
                buttonStyle={[background.primary, button.large]}
                onPress={this.doRegister}
              />
            </View>
          </ScrollView>
        </View>
      );
    }
  },
);
