import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { YNRequestInterceptors, YNRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import type { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import 'element-plus/theme-chalk/el-loading.css'

const DEFAULT_LOADING = true

export default class YNRequest {
  instance: AxiosInstance
  interceptors?: YNRequestInterceptors
  loadingInstance?: LoadingInstance
  showLoading: boolean

  constructor(config: YNRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor as any,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: '正在请求中...',
            background: 'rgba(240,248,255,.4)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loadingInstance?.close()
        return res.data
      },
      (err) => {
        this.loadingInstance?.close()
        return err
      }
    )
  }

  request<T = any>(config: YNRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === false) {
        this.showLoading = false
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          this.showLoading = DEFAULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
        })
    })
  }

  get<T = any>(config: YNRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: YNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: YNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: YNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: YNRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
