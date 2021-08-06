import axios from 'axios';
import QueryString from 'qs';

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
            Authorization: 'Bearer ' + self.token,
          };
        }
        config.data = QueryString.stringify(config.data);
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
        }
        return response;
      },
      function (error) {
        // Do something with response error
        return Promise.reject(error);
      },
    );
  }
}
