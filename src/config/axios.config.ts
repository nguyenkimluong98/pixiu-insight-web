'use client';

import Axios from 'axios';
import { configure, makeUseAxios } from 'axios-hooks';
import { AppConfig } from './app.config';
import { LRUCache } from 'lru-cache';

const axios = Axios.create({
  baseURL: AppConfig.apiBase,
  headers: {
    'Content-Type': 'application/json'
  }
});

const cache = new LRUCache<string, any>({
  max: 100,
  ttl: 5 * 1000 * 60 // 5 phút
});

// request interceptor to add token to request headers
axios.interceptors.request.use(
  async (config) => {
    // Implement function to get token
    // const token = {
    //   accessToken: 'my-access-token',
    //   refreshToken: 'my-refresh-token',
    // };

    // if (token?.accessToken) {
    //   config.headers.Authorization = `Bearer ${token?.accessToken}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor intercepting 401 responses, refreshing token and retrying the request
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Implement logic here
    if (Axios.isCancel(error)) {
      console.info('Request canceled:', error.message);
      return new Promise(() => {}); // Ngăn truyền tiếp lỗi xuống axios-hooks
    }

    return Promise.reject(error);
  }
);

configure({ axios, cache });

const useAxios = makeUseAxios({
  axios,
  cache
});

export default useAxios;
