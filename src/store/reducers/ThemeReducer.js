import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet} from 'react-native';
const ThemeContents = {
  light: {
    font: StyleSheet.create({
      primary: {
        color: '#8134fe',
      },
      title: {
        color: 'black',
        fontWeight: '600',
      },
      subtitle: {
        color: '#363636',
        fontWeight: '500',
      },
      body: {
        color: '#1C1C1C',
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
      content_level_2: {
        backgroundColor: '#d3d7d4',
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
  },
  dark: {
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
  },
};
const ThemeState = {
  ThemeType: 'light',
  ActiveThemeContent: {},
};

export default function ThemeReducer(state = ThemeState, action) {
  if (typeof state === 'undefined') {
    return ThemeState;
  }
  switch (action.type) {
    case 'SET_THEME':
      AsyncStorage.setItem('localTheme', action.ThemeType);
      return Object.assign({}, state, {
        ActiveThemeContent: ThemeContents[action.ThemeType],
        ThemeType: action.ThemeType,
      });
    default:
      return state;
  }
}
