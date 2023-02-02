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
import { mapMenusToPermissions } from '@/utils/map-menus'
import { requestPageListData } from '@/service/main/system/system'

export const useLoginStore = defineStore('login', {
  state: (): ILoginState => {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: [],
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
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
      this.mapMenusAction()

      // 登陆后通过token获取所有的部门和角色列表备用
      this.getInitialDataAction()

      // 4.跳转到首页
      router.push('/main')
    },
    phoneLoginAction(payload: any) {
      console.log('执行phoneLoginAction', payload)
    },
    mapMenusAction() {
      // 1.动态注册路由
      // userMenus => routes
      const routes = mapMenusToRoutes(this.userMenus)
      // routes => router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 2.获取所有用户按钮的权限
      console.log(this.userMenus)
      const permissions = mapMenusToPermissions(this.userMenus)
      this.permissions = permissions
    },
    setupStore() {
      this.token = localCache.getCache('token') || ''
      this.userInfo = localCache.getCache('userInfo') || {}
      this.userMenus = localCache.getCache('userMenus') || []
      this.mapMenusAction()
      this.token && this.getInitialDataAction()
    },
    async getInitialDataAction() {
      // 1.请求部门和角色数据
      const departmentResult = await requestPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      this.entireDepartment = departmentList
      const roleResult = await requestPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      this.entireRole = roleList
      const menuResult = await requestPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      this.entireMenu = menuList
    }
  }
})
