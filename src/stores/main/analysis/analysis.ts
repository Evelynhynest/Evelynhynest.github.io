import { defineStore } from 'pinia'
import type { IAnalysisState } from './types'
import {
  requestCategoryGoodsCount,
  requestCategoryGoodsSale,
  requestCategoryGoodsFavor,
  requestAddressGoodsSale
} from '@/service/main/analysis/analysis'

export const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  actions: {
    async getDashboardDataAction() {
      const categoryGoodsCountResult = await requestCategoryGoodsCount()
      this.categoryGoodsCount = categoryGoodsCountResult.data
      const categoryGoodsSaleResult = await requestCategoryGoodsSale()
      this.categoryGoodsSale = categoryGoodsSaleResult.data
      const categoryGoodsFavorResult = await requestCategoryGoodsFavor()
      this.categoryGoodsFavor = categoryGoodsFavorResult.data
      const addressGoodsSaleResult = await requestAddressGoodsSale()
      this.addressGoodsSale = addressGoodsSaleResult.data
    }
  }
})
