import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Text, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import {Button} from 'react-native-elements/dist/buttons/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';

export default connect(state => ({
  iconfont: state.styles.iconfont,
  fontSize: state.styles.fontSize,
  margin: state.styles.margin,
  fontColor: state.theme.ActiveThemeContent.fontColor,
  background: state.theme.ActiveThemeContent.background,
}))(
  /**
   * 定制header
   * @param {Object} headerStyle header样式
   * @param {React.ReactNode} headerLeft 左边dom
   * @param {React.ReactNode} headerCenter 中间dom
   * @param {React.ReactNode} headerRight 右边dom
   * @param {Object} headerBackButtonStyle 返回按钮样式
   * @param {String} title 中间标题
   * @returns React.Component
   */
  function CHeader({
    headerStyle,
    headerLeft,
    headerCenter,
    headerRight,
    headerBackButtonStyle,
    title,
    iconfont,
    fontSize,
    margin,
    fontColor,
    background,
  }) {
    const navigation = useNavigation();
    function goBack() {
      navigation.goBack();
    }
    return (
      <SafeAreaView
        edges={['top', 'left', 'right']}
        style={[background.content]}>
        <View style={[styles.header, headerStyle]}>
          {headerLeft ? (
            headerLeft
          ) : (
            <View style={[styles.headerLeft]}>
              <TouchableWithoutFeedback onPress={goBack}>
                <View
                  style={[
                    styles.headerLeftButton,
                    headerBackButtonStyle,
                    headerStyle && headerStyle.height
                      ? {height: headerStyle.height}
                      : {},
                  ]}>
                  <Text
                    style={[
                      iconfont.default,
                      fontSize.xxxxlarge,
                      margin.ml_8,
                      fontColor.title,
                    ]}>
                    {'\ue659'}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          {headerCenter ? (
            headerCenter
          ) : (
            <View style={[styles.headerCenter]}>
              <Text style={[fontSize.xxlarge, fontColor.title]}>
                {title || 'Header'}
              </Text>
            </View>
          )}
          {headerRight ? (
            headerRight
          ) : (
            <View style={[styles.headerRight]}>
              <Text />
            </View>
          )}
          <Button />
        </View>
      </SafeAreaView>
    );
  },
);

const styles = StyleSheet.create({
  header: {
    height: 48,
    flexDirection: 'row',
  },
  headerLeft: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerLeftButton: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
  },
  headerCenter: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    width: '25%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
