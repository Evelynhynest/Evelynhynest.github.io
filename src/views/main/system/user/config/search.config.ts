import type { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'Id',
      placeholder: '请输入Id'
    },
    {
      field: 'username',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'input',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择当前状态',
      options: [
        { title: '启用', value: 'enable' },
        { title: '禁用', value: 'disable' }
      ]
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '120px',
  itemStyle: { padding: '10px 20px' }
  // colLayout: { span: 8 }
}
