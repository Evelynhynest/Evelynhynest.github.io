import type { IForm } from '@/base-ui/form'

export const modalFormConfig: IForm = {
  title: '商品',
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '商品名称',
      placeholder: '请输入商品名称'
    },
    {
      field: 'oldPrice',
      type: 'input',
      label: '原价格',
      placeholder: '请输入商品原价'
    },
    {
      field: 'newPrice',
      type: 'input',
      label: '现价格',
      placeholder: '请输入商品现价'
    },
    {
      field: 'imgUrl',
      type: 'input',
      label: '商品图片',
      placeholder: '请输入商品图片链接'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
}
