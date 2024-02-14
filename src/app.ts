
import { history } from 'umi';
import cache, { getToken } from "@/utils/cache";

export function render(oldRender: any) {
  let token = getToken();
  if (token) { 
    oldRender();
  } else {
    history.replace("/login");
    oldRender()
  }
}