import request from "@/utils/request/request";
// 推荐职位
export const recommendJobs = (data: any) => {
  return request({
    url: "/jobs/recommend",
    method: "post",
    data,
  });
};

// 职位点踩
export const unLikeJob = (params: any) => {
  return request({
    url: "/jobs/job_unlike",
    method: "get",
    params,
  });
};

// 职位点赞
export const likeJob = (params: any) => {
  return request({
    url: "/jobs/job_like",
    method: "get",
    params,
  });
};

//职位详情
export const getJobDetail = (params: any) => {
  return request({
    url: "/jobs/job_detail",
    method: "get",
    params,
  });
};

//加载历史数据列表
export const getRecommendJobs = (params: any) => {
  return request({
    url: "/jobs/get_recommend_jobs",
    method: "get",
    params,
  });
};

//加载历史数据列表
export const getHistoryList = (params?: any) => {
  return request({
    url: "/jobs/get_recommend_history_list",
    method: "get",
    params,
  });
};

//加载点赞数据
export const getFavourites = (params?: any) => {
  return request({
    url: "/jobs/get_favourites",
    method: "get",
    params,
  });
};

//取消点赞
export const revokeLikeJob = (params?: any) => {
  return request({
    url: "/jobs/job_revoke_like",
    method: "get",
    params,
  });
};
