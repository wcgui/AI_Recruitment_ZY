import { checkMobilePhone, isEmail } from "@/utils/validate";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const DATE_TIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

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
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const exportApiFile = (content: any, fileName = "exportData.xlsx") => {
  const blob = new Blob([content]);
  if ("download" in document.createElement("a")) {
    // 非IE下载
    const elink = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator?.msSaveBlob(blob, fileName);
  }
};

export function formatUtcString(
  utcString: string,
  format: string = DATE_TIME_FORMAT,
  utc: number = 8
) {
  return dayjs.utc(utcString).utcOffset(utc).format(format);
}
