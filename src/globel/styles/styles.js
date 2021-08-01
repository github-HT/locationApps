import {StyleSheet, Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class GlobalTheme {
  themeLight = {
    font: StyleSheet.create({
      primary: {
        color: '#8134fe',
      },
      title: {
        color: 'black',
      },
    }),
    background: StyleSheet.create({
      default: {
        backgroundColor: '#fcfcfc',
      },
      primary: {
        backgroundColor: '#8134fe',
      },
      content: {
        backgroundColor: '#FFFFFF',
      },
    }),
    border: StyleSheet.create({
      default: {
        borderColor: '#d3d7d4',
      },
      primary: {
        borderColor: '#8134fe',
      },
    }),
  };
  themeDark = {
    font: StyleSheet.create({
      primary: {
        color: '#8134fe',
      },
      title: {
        color: 'white',
      },
      subTitle: {
        color: '#d3d7d4',
      },
      body: {
        color: 'white',
      },
    }),
    background: StyleSheet.create({
      default: {
        backgroundColor: '#1d1626',
      },
      primary: {
        backgroundColor: '#8134fe',
      },
      content: {
        backgroundColor: '#1b315e',
      },
    }),
    border: StyleSheet.create({
      default: {
        borderColor: '#3e4145',
      },
      primary: {
        borderColor: '#8134fe',
      },
    }),
  };

  ThemeType = 'light';
  ActiveThemeContent = {};

  constructor() {}

  async setTheme(ThemeType = 'os') {
    this.ThemeType = ThemeType;
    const type = await Appearance.getColorScheme();
    console.log('getColorScheme', type);
    switch (ThemeType) {
      case 'light':
      case 'dark':
        this.setThemeContent(ThemeType);
        break;
      case 'os':
        this.setThemeContent(type);
        break;
      default:
        this.setThemeContent(type);
    }
    await AsyncStorage.setItem('localTheme', ThemeType);
  }

  setThemeContent(ThemeType) {
    switch (ThemeType) {
      case 'light':
        this.ActiveThemeContent = this.themeLight;
        break;
      case 'dark':
        this.ActiveThemeContent = this.themeDark;
        break;
      default:
        this.ActiveThemeContent = this.themeLight;
    }
  }

  getThemeContent() {
    return this.ActiveThemeContent;
  }

  getThemeType() {
    return this.ThemeType;
  }
}
