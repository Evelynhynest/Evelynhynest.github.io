import { defineStore } from 'pinia'
import type { ISystemState } from './types'
import { requestPageListData } from '@/service/main/system/system'

export const useSystemStore = defineStore('system', {
  state: (): ISystemState => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: []
    }
  },
  getters: {
    pageListData() {
      return (pageName: string) => {
        return (this as any)[`${pageName}List`]
      }
    },
    pageListCount() {
      return (pageName: string) => {
        return (this as any)[`${pageName}Count`] || 0
      }
    }
  },
  actions: {
    async getPageListAction(payload: any) {
      // 1.根据pageName拼接通用的pageUrl
      const pageName = payload.pageName
      let pageUrl = ''
      switch (pageName) {
        case 'users':
          pageUrl = '/users/list'
          break
        case 'role':
          pageUrl = '/role/list'
          break
        case 'goods':
          pageUrl = '/goods/list'
          break
        case 'menu':
          pageUrl = '/menu/list'
          break
      }
      // 2.发请求获取数据
      const pageResult = await requestPageListData(pageUrl, payload.queryInfo)
      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data
      switch (pageName) {
        case 'users':
          this.usersList = list
          this.usersCount = totalCount
          break
        case 'role':
          this.roleList = list
          this.roleCount = totalCount
          break
        case 'goods':
          this.goodsList = list
          this.goodsCount = totalCount
          break
        case 'menu':
          this.menuList = list
          break
      }
    }
  }
})
