export const Keys = {
  tokenKey: "authorization",
  userInfoKey: "userInfo",
};
class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string) {
    // obj => string => obj
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }

  clearCache() {
    window.localStorage.clear();
  }
  //根据Keys定义，值设置成空
  clearAllCacheByKeys() {
    Object.entries(Keys).forEach(([k, v]) => {
      this.deleteCache(v);
    });
  }
}
//获取token
export const getToken = () => new LocalCache().getCache(Keys.tokenKey);
//设置token
export const setToken = (token: string) =>
  new LocalCache().setCache(Keys.tokenKey, token);

//获取用户信息
export const getUserInfo = () => new LocalCache().getCache(Keys.userInfoKey);
//设置用户信息
export const setUserInfo = (info: string) =>
  new LocalCache().setCache(Keys.userInfoKey, info);
export default new LocalCache();
