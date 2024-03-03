import request from "@/utils/request/request";
// 获取问题
export const getInteractiveAsk = (params: any) => {
  return request({
    url: "/interactive/ask",
    method: "get",
    params,
  });
};

// 回答问题
export const interactiveAnswer = (data: any) => {
  return request({
    url: "/interactive/answer",
    method: "post",
    data,
  });
};