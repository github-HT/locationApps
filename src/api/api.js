import {getDeviceInfo} from '../models/userModel.js';
import {RequestAddToken} from './request.js';

const baseUrl =
  'https://c9cc885f-7b7d-47a3-b722-195d7d6349ad.bspapp.com/http/users';
const Req = new RequestAddToken({
  baseUrl: baseUrl,
  timeout: 20 * 1000,
});
export async function doRegister(params = {}) {
  return await Req.post(baseUrl, {
    action: 'register',
    params,
    deviceInfo: await getDeviceInfo(),
  });
}
export async function doLogin(params = {}) {
  return await Req.post(baseUrl, {
    action: 'login',
    params,
    deviceInfo: await getDeviceInfo(),
  });
}
export async function getUserInfo(params = {}) {
  return await Req.post(baseUrl, {
    action: 'getCurrentUserInfo',
    params,
  });
}
export async function doLogOut(params = {}) {
  Req.LogOut();
  return await Req.post(baseUrl, {
    action: 'logout',
    params,
  });
}
export async function initSignToken(params = {}) {
  return await Req.getLocalToken();
}
export async function locationUpload(params = {}) {
  return await Req.post(baseUrl, {
    action: 'locationUpload',
    params,
  });
}
