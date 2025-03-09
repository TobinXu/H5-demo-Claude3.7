import axios from 'axios';

// 创建axios实例
const api = axios.create({
  baseURL: 'https://api.example.com', // 替换为实际的API基础URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，例如添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      console.error('Response error:', error.response.status, error.response.data);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.error('Request error:', error.request);
    } else {
      // 在设置请求时触发错误
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;