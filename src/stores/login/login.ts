import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusById
} from '@/service/login/login'
import type { IAccount } from '@/service/login/types'
import localCache from '@/utils/localCache'
import router from '@/router'
import mapMenusToRoutes from '@/utils/map-menus'
import type { ILoginState } from './types'

export const useLoginStore = defineStore('login', {
  state: (): ILoginState => {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  getters: {},
  actions: {
    async accountLoginAction(payload: IAccount) {
      // 1.实现登录逻辑，拿到token和用户id
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      this.token = token
      localCache.setCache('token', this.token)

      // 2.根据用户id请求身份信息
      const userInfoResult = await requestUserInfoById(id)
      this.userInfo = userInfoResult.data
      localCache.setCache('userInfo', this.userInfo)

      // 3.根据用户id请求菜单信息
      const userMenusResult = await requestUserMenusById(this.userInfo.role.id)
      this.userMenus = userMenusResult.data
      localCache.setCache('userMenus', this.userMenus)

      // 4.跳转到首页
      router.push('/main')
    },
    phoneLoginAction(payload: any) {
      console.log('执行phoneLoginAction', payload)
    },
    setLoginStore() {
      this.token = localCache.getCache('token') || ''
      this.userInfo = localCache.getCache('userInfo') || {}
      this.userMenus = localCache.getCache('userMenus') || []
      // userMenus => routes
      const routes = mapMenusToRoutes(this.userMenus)
      // routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      router.push({
        path: router.currentRoute.value.path
      })
    }
  }
})
