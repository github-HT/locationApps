import {doLogOut, initSignToken} from '../api/api';
import store from '../store';
import {UtilStorage} from '../utils/utils';

export function initLocalStorage() {
  initLocalUserInfo();
  initSignToken();
}

export async function initLocalUserInfo() {
  try {
    const userInfo = await UtilStorage.getItem('LocalUserInfo');
    if (userInfo) {
      store.dispatch({
        type: 'SET_USER_INFO',
        userInfo: userInfo,
      });
    }
  } catch (error) {
    console.log('initLocalUserInfo try catch err', error);
  }
}

export function setUserInfo(userInfo) {
  UtilStorage.setItem('LocalUserInfo', userInfo);
  store.dispatch({
    type: 'SET_USER_INFO',
    userInfo: userInfo,
  });
}
export function LogOut(userInfo) {
  doLogOut();
  UtilStorage.removeItem('LocalUserInfo');
  store.dispatch({
    type: 'CLEAR_USER_INFO',
  });
}
