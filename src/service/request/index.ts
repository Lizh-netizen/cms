import axios, { Axios, AxiosResponse } from 'axios'
import type { AxiosInstance } from 'axios'
import { ElLoading } from '../../../node_modules/element-plus'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

// 封装axios
class HYRequest {
  instance: AxiosInstance
  loading?: LoadingInstance
  showLoading: boolean
  interceptors?: HYRequestInterceptors
  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.showLoading = config.showLoading ?? true
    this.interceptors = config.interceptors

    // 单个实例中的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例中的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据。。',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        setTimeout(() => {
          this.loading?.close()
        }, 1000)
        if (data.returnCode === '-1001') {
          console.log('error')
        } else {
          return data
        }
      },
      (err) => {
        // 判断不同的httpErrorCode显示不同的错误信息
        if (err.response.status === '405') {
          console.log('405错误')
        }
        return err
      }
    )
  }
  request<T = any>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断是否需要显示loading（默认是显示的，具体是否需要显示的话需要传入来这么一个参数的）
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      // 单个请求对数据的处理
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        // 会返回resolved promise or rejected promise
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }
  get<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
