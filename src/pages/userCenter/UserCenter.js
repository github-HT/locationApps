import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Button} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import Animateds from './children/Animateds';

export default connect(state => ({
  ThemeType: state.ThemeReducer.ThemeType,
  ActiveThemeContent: state.ThemeReducer.ActiveThemeContent,
}))(
  class UserCenter extends Component {
    toLogin = () => {
      this.props.navigation.push('Login', {});
    };
    componentDidMount() {
      console.log(this.props);
    }

    render() {
      const {ActiveThemeContent} = this.props;
      console.log(ActiveThemeContent);
      const {background} = ActiveThemeContent;
      console.log(background.primary);
      return (
        <SafeAreaView style={styles.fullScreen}>
          {/* <Header
          backgroundColor={'white'}
          centerComponent={{text: '用户中心', style: styles.headerCenterText}}
        /> */}
          <View style={styles.fullScreen}>
            <Button
              title="去登录"
              buttonStyle={ActiveThemeContent.background.primary}
              onPress={this.toLogin}
            />
            <Animateds />
          </View>
        </SafeAreaView>
      );
    }
  },
);

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  headerCenterText: {
    fontSize: 17,
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'red',
    color: 'red',
  },
  iconStyle: {
    fontFamily: 'iconfont',
    fontSize: 24,
    marginTop: 10,
    marginLeft: 10,
  },
});
