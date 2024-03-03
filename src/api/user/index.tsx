import request from "@/utils/request/request";
// 密码修改
export const changePassword = (params?: any) => {
  return request({
    url: "/user/change_password",
    method: "get",
    params,
  });
};