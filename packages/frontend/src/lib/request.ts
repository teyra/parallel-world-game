import axios from "axios";

// 创建 axios 实例
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com", // API 基础路径
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些处理，比如添加 Token
    const token = localStorage.getItem("access_token"); // 从本地存储获取 Token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    // 处理响应数据
    return response.data;
  },
  (error) => {
    // 处理响应错误
    if (error.response) {
      // 服务器返回的错误
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      // 请求未收到响应
      console.error("Request Error:", error.request);
    } else {
      // 其他错误
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

// 封装请求方法
const http = {
  get: (url: string, params?: object) => {
    return axiosInstance.get(url, { params });
  },
  post: (url: string, data?: object) => {
    return axiosInstance.post(url, data);
  },
  put: (url: string, data?: object) => {
    return axiosInstance.put(url, data);
  },
  delete: (url: string, params?: object) => {
    return axiosInstance.delete(url, { params });
  },
};

export default http;
