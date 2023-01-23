import ynRequest from '@/service'
import type { IDataType } from '@/service/types'

export function requestPageListData(url: string, queryInfo: any) {
  return ynRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}

export function deletePageData(url: string) {
  return ynRequest.delete<IDataType>({
    url
  })
}

export function createPageData(url: string, newData: any) {
  return ynRequest.post<IDataType>({
    url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return ynRequest.patch<IDataType>({
    url,
    data: editData
  })
}
