import QueryString from 'qs';
import CryptoJS from 'crypto-js';
import {Login} from '../../api/api';

const UserState = {
  isLogin: false,
  userInfo: {
    age: '',
    name: '',
    sex: '',
    tm: 0,
    uid: 0,
    userName: '',
  },
};

export default function UserReducer(state = UserState, action) {
  switch (action.type) {
    case 'LOGIN':
      return doLogin(state, action);
    default:
      return state;
  }
}

function doLogin(state, {userInfo}) {
  return Object.assign({}, state, {
    isLogin: true,
    userInfo: {
      age: userInfo.age,
      name: userInfo.name,
      sex: userInfo.sex,
      tm: userInfo.tm,
      uid: userInfo.uid,
      userName: userInfo.userName,
    },
  });
}
