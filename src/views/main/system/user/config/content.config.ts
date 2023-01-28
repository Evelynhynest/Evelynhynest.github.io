import type { ITable } from '@/base-ui/table'
export const contentTableConfig: ITable = {
  tableTitle: '用户列表',
  propList: [
    { prop: 'name', label: '用户名', minWidth: '120' },
    { prop: 'realname', label: '真实姓名', minWidth: '120' },
    { prop: 'enable', label: '状态', minWidth: '120', slotName: 'status' },
    { prop: 'cellphone', label: '电话', minWidth: '120' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
  ],
  showSelectionColumn: true,
  showIndexColumn: true
}
