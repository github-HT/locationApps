import {RequestAddToken} from './request.js';

const baseUrl = 'http://localhost:3000';
const Req = new RequestAddToken({
  baseUrl: baseUrl,
  timeout: 20 * 1000,
});
export async function doRegister(params = {}) {
  return await Req.post(baseUrl + '/users/register', params);
}
export async function doLogin(params = {}) {
  return await Req.post(baseUrl + '/users/login', params);
}
export async function getUserInfo(params = {}) {
  return await Req.get(baseUrl + '/users/userinfo', params);
}
export async function doLogOut(params = {}) {
  return await Req.LogOut();
}
export async function initSignToken(params = {}) {
  return await Req.getLocalToken();
}
