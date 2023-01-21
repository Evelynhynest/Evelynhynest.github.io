import type { ITable } from '@/base-ui/table'
export const contentTabelConfig: ITable = {
  tableTitle: '用户列表',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '180' },
    { prop: 'realname', label: '真实姓名', minWidth: '180' },
    { prop: 'enable', label: '状态', minWidth: '180', slotName: 'status' },
    { prop: 'cellphone', label: '电话', minWidth: '180' },
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
