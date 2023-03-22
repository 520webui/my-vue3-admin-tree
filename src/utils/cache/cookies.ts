/** 统一处理 Cookie */

// @ts-ignore
import CacheKey from "@/constants/cacheKey"
// @ts-ignore
import Cookies from "js-cookie"

export const getToken = () => {
  return Cookies.get(CacheKey.TOKEN)
}
export const setToken = (token: string) => {
  Cookies.set(CacheKey.TOKEN, token)
}
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN)
}
