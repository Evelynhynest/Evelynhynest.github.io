import ynRequest from '@/service'
import type { IDataType } from '@/service/types'

export function requestPageListData(url: string, queryInfo: any) {
  return ynRequest.post<IDataType>({
    url,
    data: queryInfo
  })
}
