import request from "@/utils/request/request";
// 账号登录
export const accountLogin = (data: any) => {
  return request({
    url: "/auth/login",
    method: "post",
    data,
  });
};

// 账号注册
export const accountRegister = (data: any) => {
  return request({
    url: "/auth/register",
    method: "post",
    data,
  });
};

// 获取用户信息
export const getUserInfo = (params?: any) => {
  return request({
    url: "/auth/getUser",
    method: "get",
    params,
  });
};