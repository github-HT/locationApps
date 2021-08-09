import {doLogOut, initSignToken} from '../api/api';
import store from '../store';
import {UtilStorage} from '../utils/utils';
import {v5 as uuidv5} from 'uuid';
import {v1 as uuidv1} from 'uuid';
import {Platform} from 'react-native';

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

export async function initDeviceId(userInfo) {
  const res = await UtilStorage.getItem('LOCAL_DEVICE_UUID');
  if (res) {
    return res;
  }
  const v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: Math.floor(Math.random() * 10000),
  };
  const uuid = uuidv5(
    JSON.stringify(v1options),
    'bba15122-f749-11eb-9234-0123456789ab',
  );
  const res1 = await UtilStorage.setItem('LOCAL_DEVICE_UUID', uuid);
  console.log(uuid, res1);
  return uuid;
}

export async function getDeviceInfo() {
  return {
    DeviceId: await initDeviceId(),
    ...Platform,
  };
}
