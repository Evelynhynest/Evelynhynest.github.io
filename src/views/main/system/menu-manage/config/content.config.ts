import type { ITable } from '@/base-ui/table'
export const contentTableConfig: ITable = {
  tableTitle: '菜单列表',
  propList: [
    { prop: 'name', label: '菜单名称', minWidth: '120' },
    { prop: 'type', label: '类型', minWidth: '100' },
    { prop: 'url', label: '菜单url', minWidth: '120', slotName: 'status' },
    { prop: 'icon', label: '菜单icon', minWidth: '100' },
    { prop: 'permission', label: '按钮权限', minWidth: '100' },
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
  showSelectionColumn: false,
  showIndexColumn: false,
  childrenProps: {
    rowKey: 'id',
    treeProps: {
      children: 'children'
    }
  },
  showFooter: false
}
