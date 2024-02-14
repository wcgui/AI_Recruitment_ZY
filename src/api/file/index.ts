import request from "@/utils/request/request";
// 上传文件
export const uploadFile = (data: any) => {
  return request({
    url: "/file/upload",
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};

// 获取文件详情
export const getFileDetails = (params?: any) => {
  return request({
    url: "/file/upload_token",
    method: "get",
    params,
  });
};

// 获取文件url
export const getFileUrl = (params: any) => {
  return request({
    url: "/file/get_url",
    method: "get",
    params,
  });
};

//下载文件
export const downloadFile = (params: any) => {
  return request({
    url: "/file/download",
    method: "get",
    params,
  });
};
