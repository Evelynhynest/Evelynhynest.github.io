import type { ITable } from '@/base-ui/table'
export const contentTableConfig: ITable = {
  tableTitle: '商品类别列表',
  propList: [
    { prop: 'name', label: '商品名称', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showSelectionColumn: true,
  showIndexColumn: true
}
