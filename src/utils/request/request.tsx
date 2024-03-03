import axios from "axios";
import { message, Spin, } from "antd";
import ReactDOM from 'react-dom';
import { history } from 'umi';
import cache, { getToken, setToken } from "@/utils/cache";
// 當前正在請求的數量
let requestCount = 0

// 顯示loading
function showLoading () {
  if (requestCount === 0) {
      var dom = document.createElement('div');
      dom.setAttribute('id', 'loading');
      document.body.appendChild(dom);
      let spinDom = <Spin tip="loading..." size="large"/>;
      ReactDOM.render(spinDom, dom)
  }
  requestCount++;
}

// 隱藏loading
function hideLoading () {
  requestCount--
  if (requestCount === 0) {
    document.getElementById('loading') && document.body.removeChild(document.getElementById('loading'));
  }
}

export default (config: any) => {
  // 创建axios实例
  const service: any = axios.create({
    baseURL: window.location.hostname==='localhost' ? '/api' : "/api/release/v1",
    // 超时
    timeout: config.timeout || 10000,
  });
  // 请求拦截器
  service.interceptors.request.use(
    (config: any) => {
      config.headers["Authorization"] = "Bearer " + getToken();
      config.headers["Content-Type"] =
        config.headers["Content-Type"] || "application/json";
      if (!config.headers.noLoading) {
        showLoading();
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );
  // 响应拦截器
  service.interceptors.response.use(
    (response: any) => {
      const code = response.data.code;
      if (!response.config.headers.noLoading) {
        hideLoading();
      }
      if (
        code == "D0005" ||
        code == "D0104" ||
        code == "D0003" ||
        code == "D0006"
      ) {
        message.error("Login status has expired. Please log in again");
        setToken("");
        history.push("/login");
      }  else if (code !== 200) {
        message.error(response.data.message);
        return Promise.reject(response.data);
      } else {
        return response.data;
      }
    },
    (error: any) => {
      if (!error.config.headers.noLoading) {
        hideLoading();
      }
      message.error( error.message);
      return Promise.reject(error);
    }
  );
  return service(config);
};
