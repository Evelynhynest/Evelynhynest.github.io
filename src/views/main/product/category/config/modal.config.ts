import type { IForm } from '@/base-ui/form'
export const modalFormConfig: IForm = {
  title: '商品类别',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品类别',
      placeholder: '请输入商品类别'
    }
  ],
  itemStyle: {},
  colLayout: { span: 24 }
}
