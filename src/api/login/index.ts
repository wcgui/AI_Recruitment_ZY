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

// 账号注册
export const getUserInfo = (data?: any) => {
  return request({
    url: "/auth/getUser",
    method: "get",
    data,
  });
};