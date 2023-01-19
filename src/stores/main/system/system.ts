import { defineStore } from 'pinia'
import type { ISystemState } from './types'
import { requestPageListData } from '@/service/main/system/system'

export const useSystemStore = defineStore('system', {
  state: (): ISystemState => {
    return {
      userList: [],
      userCount: 0
    }
  },
  getters: {},
  actions: {
    async getPageListAction(payload: any) {
      const pageResult = await requestPageListData(
        payload.pageUrl,
        payload.queryInfo
      )
      this.userList = pageResult.data.list
      this.userCount = pageResult.data.totalCount
    }
  }
})
