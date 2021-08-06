import {Link} from '@react-navigation/native';
import React, {Component} from 'react';
import {Text, BackHandler, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import CryptoJS from 'crypto-js';
import {doLogin} from '../../api/api';
import {setUserInfo} from '../../models/userModel';

export default connect(state => ({
  background: state.theme.ActiveThemeContent.background,
  fontColor: state.theme.ActiveThemeContent.background,
  padding: state.styles.padding,
  otherStyles: state.styles.otherStyles,
  fontSize: state.styles.fontSize,
  isLogin: state.user.isLogin,
  userInfo: state.user.userInfo,
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
      const data = {
        userName: this.state.userName.value,
        password: CryptoJS.MD5(this.state.password.value).toString(),
      };
      const res = await doLogin(data);
      if (res && res.data && res.data.code === 0) {
        // this.props.dispatch({
        //   type: 'SET_USER_INFO',
        //   userInfo: res.data.userInfo,
        // });
        setUserInfo(res.data.userInfo);
        if (this.props.isLogin) {
          this.props.navigation.goBack();
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
        isLogin,
        userInfo,
      } = this.props;
      return (
        <SafeAreaView style={[background.content, otherStyles.fillContent]}>
          <ScrollView>
            <Text style={[fontColor.title, fontSize.xxlarge]}>
              登录 {isLogin ? 'login' : 'no'}
            </Text>

            <Input
              placeholder="账号"
              keyboardType="email-address"
              onChangeText={this.setUserName}
            />

            <Input
              placeholder="密码"
              keyboardType="default"
              secureTextEntry={true}
              onChangeText={this.setPassword}
            />
            <Link to={'/Register'}>去注册</Link>
            <View style={[padding.pt_32]}>
              <Button title="登录" onPress={this.doLogin} />
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  },
);
