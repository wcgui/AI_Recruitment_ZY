import { useState, useEffect } from "react";
import { getToken } from "@/utils/cache";
import * as LOGIN from "@/api/login/index";

const UsersModel= () => {
  const [userInfo, setUserInfo] = useState({}); 

  useEffect(() => {
    if (getToken()) {
      // LOGIN.getUserInfo().then((res: any) => {
      //   setUserInfo(res.data || {});
      // });
    }
  }, [getToken()]);
  return {
    userInfo,
    setUserInfo,
  }
}

export default UsersModel;