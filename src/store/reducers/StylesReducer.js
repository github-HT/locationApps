import {StyleSheet} from 'react-native';
const paddingArray = [0, 4, 8, 12, 16, 20, 24, 28, 32, 64, 128];
const padding = {};
paddingArray.forEach(item => {
  padding['pa_' + item] = {
    padding: item,
  };
  padding['px_' + item] = {
    paddingLeft: item,
    paddingRight: item,
  };
  padding['py_' + item] = {
    paddingTop: item,
    paddingBottom: item,
  };
  padding['pt_' + item] = {
    paddingTop: item,
  };
  padding['pl_' + item] = {
    paddingLeft: item,
  };
  padding['pr_' + item] = {
    paddingRight: item,
  };
  padding['pb_' + item] = {
    paddingBottom: item,
  };
});
const margin = {};
paddingArray.forEach(item => {
  margin['ma_' + item] = {
    margin: item,
  };
  margin['mx_' + item] = {
    marginLeft: item,
    marginRight: item,
  };
  margin['my_' + item] = {
    marginTop: item,
    marginBottom: item,
  };
  margin['mt_' + item] = {
    marginTop: item,
  };
  margin['ml_' + item] = {
    marginLeft: item,
  };
  margin['mr_' + item] = {
    marginRight: item,
  };
  margin['mb_' + item] = {
    marginBottom: item,
  };
});
const StylesContents = {
  padding: StyleSheet.create(padding),
  margin: StyleSheet.create(margin),
  borderRadius: StyleSheet.create({
    small: {
      borderRadius: 5,
    },
    medium: {
      borderRadius: 10,
    },
    large: {
      borderRadius: 15,
    },
    xlarge: {
      borderRadius: 20,
    },
  }),
  fontWeight: StyleSheet.create({
    default: {
      fontWeight: '400',
    },
    small: {
      fontWeight: '300',
    },
    medium: {
      fontWeight: '500',
    },
    large: {
      fontWeight: '600',
    },
    xlarge: {
      fontWeight: '700',
    },
  }),
};

export default function StylesReducer(state = StylesContents, action) {
  if (typeof state === 'undefined') {
    return StylesContents;
  }
  return state;
}
