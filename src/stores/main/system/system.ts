import { defineStore } from 'pinia'
import type { ISystemState } from './types'
import {
  requestPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

export const useSystemStore = defineStore('system', {
  state: (): ISystemState => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      departmentCount: 0,
      departmentList: [],
      categoryCount: 0,
      categoryList: [],
      storyList: [],
      storyCount: 0
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
        case 'department':
          pageUrl = '/department/list'
          break
        case 'category':
          pageUrl = '/category/list'
          break
        case 'story':
          pageUrl = '/story/list'
          break
      }
      // 2.发请求获取数据
      const pageResult = await requestPageListData(pageUrl, payload.queryInfo)
      // console.log(pageResult)
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
        case 'department':
          this.departmentList = list
          this.departmentCount = totalCount
          break
        case 'category':
          this.categoryList = list
          this.categoryCount = totalCount
          break
        case 'story':
          this.storyList = list
          this.storyCount = totalCount
          break
      }
    },
    async deletePageDataAction(payload: any) {
      // 1.获取pageName和id
      // payload对象中存有用于拼接url的pageName和id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 2.调用删除网络请求
      await deletePageData(pageUrl)
      // 3.重新请求最新数据
      // 待处理：page-search组件的input中输入的查询条件如果需要一起作为参数携带
      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async createPageDataAction(payload: any) {
      // 1.创建数据的请求
      // pageName用于拼接url，newData用于新建具体数据
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      // 2.请求最新的数据
      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    async editPageDataAction(payload: any) {
      // 1.编辑数据的请求
      // pageName用于拼接url，newData用于新建具体数据
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      // 2.请求最新的数据
      this.getPageListAction({
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
})
