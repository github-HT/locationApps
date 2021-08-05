import AsyncStorage from '@react-native-async-storage/async-storage';
import {Link} from '@react-navigation/native';
import React, {Component} from 'react';
import {Text, BackHandler, View} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import qs from 'qs';
import CryptoJS from 'crypto-js';

export default connect(state => ({
  background: state.theme.ActiveThemeContent.background,
  fontColor: state.theme.ActiveThemeContent.background,
  padding: state.styles.padding,
  otherStyles: state.styles.otherStyles,
  fontSize: state.styles.fontSize,
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

    doLogin = () => {
      console.log('do Lodin', this.state.userName, this.state.password);

      const body = qs.stringify({
        userName: this.state.userName.value,
        password: CryptoJS.MD5(this.state.password.value).toString(),
      });
      console.log(body, typeof body);

      // let formData = new FormData();
      // formData.append('name', '张三');
      // formData.append('age', 18);
      fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: {},
        body: body,
      })
        .then(response => response.json())
        .then(res => {
          const data = res;
          console.log('users/login', data);
          fetch('http://localhost:3000/users/userinfo', {
            method: 'GET',
            headers: {
              Authorization: 'Bearer ' + data.token,
            },
          })
            .then(response => response.json())
            .then(ret => {
              console.log('getuserinfo', ret);
            })
            .catch(err => {
              console.log('/users/userinfo', err);
            });
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

    render() {
      const {background, otherStyles, fontColor, fontSize, padding} =
        this.props;
      return (
        <SafeAreaView style={[background.content, otherStyles.fillContent]}>
          <ScrollView>
            <Text style={[fontColor.title, fontSize.xxlarge]}> 登录 </Text>

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
