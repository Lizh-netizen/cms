import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
// 跨域访问是在vue.config.js中处理的
import localCache from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 但是为啥token是放在这里的？而不是类中呢？
    requestInterceptor: (config) => {
      const token = localCache.getCache('token')
      if (token && config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    }
  }
})
export default hyRequest
