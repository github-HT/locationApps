import axios from 'axios';
import QueryString from 'qs';
import store from '../store';
import {UtilStorage} from '../utils/utils';

export class Request {
  instance = null;
  constructor(initConfig = {}) {
    this.initReqest(initConfig);
  }
  initReqest(initConfig) {
    this.instance = axios.create(initConfig);
    this.addInterceptor();
  }

  addInterceptor() {
    // Add a request interceptor
    // this.instance.interceptors.request.use(
    //   function (config) {
    //     // Do something before request is sent
    //     return config;
    //   },
    //   function (error) {
    //     // Do something with request error
    //     return Promise.reject(error);
    //   },
    // );
    // // Add a response interceptor
    // this.instance.interceptors.response.use(
    //   function (response) {
    //     // Do something with response data
    //     return response;
    //   },
    //   function (error) {
    //     // Do something with response error
    //     return Promise.reject(error);
    //   },
    // );
  }

  post(url, data, config) {
    return this.instance.post(url, data, config);
  }

  get(url, config) {
    return this.instance.get(url, config);
  }
}

export class RequestAddToken extends Request {
  token = null;

  addInterceptor() {
    // Add a request interceptor
    const self = this;
    this.instance.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        if (self.token) {
          config.headers = {
            Authorization: self.token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
          };
        }
        config.data = JSON.stringify(config.data);
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    this.instance.interceptors.response.use(
      function (response) {
        // Do something with response data
        const data = response.data;
        if (data.token) {
          self.token = data.token;
          UtilStorage.setItem('signToken', data.token);
        }
        if (data.code === 403 || data.code === '403') {
          store.dispatch({
            type: 'CLEAR_USER_INFO',
          });
        }
        return response;
      },
      function (error) {
        // Do something with response error
        console.log(error);
        if (error.response.status === 401) {
          store.dispatch({
            type: 'CLEAR_USER_INFO',
          });
        }

        return Promise.reject(error);
      },
    );
  }

  LogOut() {
    this.token = null;
    UtilStorage.removeItem('signToken');
  }

  async getLocalToken() {
    try {
      const res = await UtilStorage.getItem('signToken');
      console.log('getLocalToken', res);
      if (res) {
        this.token = res;
      }
    } catch (error) {
      console.log('try catch err', error);
    }
  }
}
