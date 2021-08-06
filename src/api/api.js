import {RequestAddToken} from './request.js';

const baseUrl = 'http://localhost:3000';
const Req = new RequestAddToken({
  baseUrl: baseUrl,
  timeout: 20 * 1000,
});
export async function Register(params = {}) {
  return await Req.post(baseUrl + '/users/register', params);
}
export async function Login(params = {}) {
  return await Req.post(baseUrl + '/users/login', params);
}
export async function UserInfo(params = {}) {
  return await Req.get(baseUrl + '/users/userinfo', params);
}
