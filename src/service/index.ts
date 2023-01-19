import YNRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/localCache'

const ynRequest = new YNRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      const token = localCache.getCache('token')
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      return res
    },
    responseInterceptorCatch(err) {
      return err
    }
  }
})

const ynRequest2 = new YNRequest({
  baseURL: '',
  timeout: 5000,
  interceptors: {
    requestInterceptor(config) {
      return config
    },
    requestInterceptorCatch(err) {
      return err
    },
    responseInterceptor(res) {
      return res
    }
  }
})

export default ynRequest
export { ynRequest2 }
