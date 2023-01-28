import { defineStore } from 'pinia'
import type { IAnalysisState } from './types'
import {
  requestGoodsAmountList,
  requestCategoryGoodsCount,
  requestCategoryGoodsSale,
  requestCategoryGoodsFavor,
  requestAddressGoodsSale
} from '@/service/main/analysis/analysis'

export const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => {
    return {
      goodsAmountList: [],
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  actions: {
    async getDashboardDataAction() {
      const goodsAmountListResult = await requestGoodsAmountList()
      this.goodsAmountList = goodsAmountListResult.data
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
