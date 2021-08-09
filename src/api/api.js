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
  });
}
export async function doLogin(params = {}) {
  return await Req.post(baseUrl, {
    action: 'login',
    params,
  });
}
export async function getUserInfo(params = {}) {
  return await Req.post(baseUrl, {
    action: 'getCurrentUserInfo',
    params,
  });
}
export async function doLogOut(params = {}) {
  return await Req.post(baseUrl, {
    action: 'logout',
    params,
  });
}
export async function initSignToken(params = {}) {
  return await Req.getLocalToken();
}
export async function locationUpload(params = {}) {
  console.log('locationUpload request', params);
  return await Req.post(baseUrl + '/location/info/load', params);
}
