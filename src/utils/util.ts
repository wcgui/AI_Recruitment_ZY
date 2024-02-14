
import { checkMobilePhone, isEmail } from "@/utils/validate";

//手机号校验
export const checkMobilePhoneRule = (rule: any, value: any) => {

  if (!value || checkMobilePhone(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Please enter your phone number properly"));
  }
};

//手机号校验
export const checkEmailRule = (rule: any, value: any) => {

  if (!value || isEmail(value)) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Please enter your email properly"));
  }
};

//获取随机字符串
export const generateRandomString = (length: any) => {  
  let result = '';  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';  
  const charactersLength = characters.length;  
  for (let i = 0; i < length; i++) {  
      result += characters.charAt(Math.floor(Math.random() * charactersLength));  
  }  
  return result;  
} 