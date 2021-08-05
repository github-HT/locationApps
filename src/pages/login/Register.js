import QueryString from 'qs';
import React, {Component} from 'react';
import {Text, BackHandler} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import CryptoJS from 'crypto-js';

export default connect(state => ({
  background: state.theme.ActiveThemeContent.background,
  fontColor: state.theme.ActiveThemeContent.background,
  padding: state.styles.padding,
  otherStyles: state.styles.otherStyles,
  fontSize: state.styles.fontSize,
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
      this.props.navigation.goBack();
      return true;
    };

    doRegister = () => {
      console.log(
        'do Register',
        this.state.userName,
        this.state.password,
        this.state.confirmPassword,
      );

      const body = QueryString.stringify({
        userName: this.state.userName.value,
        password: CryptoJS.MD5(this.state.password.value).toString(),
      });

      fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {},
        body,
      })
        .then(response => response.json())
        .then(ret => {
          console.log('register', ret);
        })
        .catch(err => {
          console.error('/users/register error', err);
        });
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
        password: {
          value: e,
        },
      });
    };

    render() {
      const {background, otherStyles, fontColor, fontSize} = this.props;
      return (
        <SafeAreaView style={[background.content, otherStyles.fillContent]}>
          <ScrollView>
            <Text style={[fontColor.title, fontSize.xxlarge]}> 注册 </Text>

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
            <Input
              placeholder="确认密码"
              keyboardType="default"
              secureTextEntry={true}
              onChangeText={this.setConfirmPassword}
            />
            <Button title="提交" onPress={this.doRegister} />
          </ScrollView>
        </SafeAreaView>
      );
    }
  },
);
