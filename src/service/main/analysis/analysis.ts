import ynRequest from '@/service'
import type { IDataType } from '@/service/types'

enum DashboardAPI {
  goodsAmountList = '/goods/amount/list',
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export function requestGoodsAmountList() {
  return ynRequest.get<IDataType>({
    url: DashboardAPI.goodsAmountList
  })
}
export function requestCategoryGoodsCount() {
  return ynRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsCount
  })
}
export function requestCategoryGoodsSale() {
  return ynRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsSale
  })
}
export function requestCategoryGoodsFavor() {
  return ynRequest.get<IDataType>({
    url: DashboardAPI.categoryGoodsFavor
  })
}
export function requestAddressGoodsSale() {
  return ynRequest.get<IDataType>({
    url: DashboardAPI.addressGoodsSale
  })
}
