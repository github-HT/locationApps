import {StyleSheet} from 'react-native';
const paddingArray = [0, 4, 8, 12, 16, 20, 24, 28, 32, 64, 128];
const padding = {};
paddingArray.forEach(item => {
  padding['pa_' + item] = {
    paddingHorizontal: item,
    paddingVertical: item,
    padding: item,
  };
  padding['px_' + item] = {
    paddingHorizontal: item,
    paddingLeft: item,
    paddingRight: item,
  };
  padding['py_' + item] = {
    paddingTop: item,
    paddingBottom: item,
    paddingVertical: item,
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
    top_small: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    },
    top_medium: {
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    top_large: {
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    top_xlarge: {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    bottom_small: {
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },
    bottom_medium: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    bottom_large: {
      borderBottomLeftRadius: 15,
      borderBottomRightRadius: 15,
    },
    bottom_xlarge: {
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    left_small: {
      borderTopLeftRadius: 5,
      borderBottomLeftRadius: 5,
    },
    left_medium: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
    },
    left_large: {
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
    },
    left_xlarge: {
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
    },
    right_small: {
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
    },
    right_medium: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
    },
    right_large: {
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,
    },
    right_xlarge: {
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
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
  fontSize: StyleSheet.create({
    xxxxxxlarge: {
      fontSize: 128,
    },
    xxxxxlarge: {
      fontSize: 64,
    },
    xxxxlarge: {
      fontSize: 32,
    },
    xxxlarge: {
      fontSize: 24,
    },
    xxlarge: {
      fontSize: 20,
    },
    xlarge: {
      fontSize: 18,
    },
    large: {
      fontSize: 16,
    },
    title: {
      fontSize: 14,
      fontWeight: '500',
    },
    subTitle: {
      fontSize: 12,
    },
    body: {
      fontSize: 14,
    },
    body_2: {
      fontSize: 12,
    },
    body_3: {
      fontSize: 10,
    },
    body_4: {
      fontSize: 8,
    },
    body_5: {
      fontSize: 6,
    },
  }),
  iconfont: StyleSheet.create({
    default: {
      fontFamily: 'iconfont',
      fontSize: 24,
    },
  }),
  button: StyleSheet.create({
    large: {
      height: 48,
      fontSize: 16,
    },
    medium: {
      height: 40,
      fontSize: 14,
    },
    small: {
      height: 32,
      fontSize: 12,
    },
  }),
  otherStyles: StyleSheet.create({
    fillContent: {
      flex: 1,
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentStart: {
      justifyContent: 'flex-start',
    },
    justifyContentEnd: {
      justifyContent: 'flex-end',
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    alignItemsStart: {
      alignItems: 'flex-start',
    },
    alignItemsEnd: {
      alignItems: 'flex-end',
    },
  }),
};

export default function StylesReducer(state = StylesContents, action) {
  if (typeof state === 'undefined') {
    return StylesContents;
  }
  return state;
}
