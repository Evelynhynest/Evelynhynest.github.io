type IFormType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select元素
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
}

interface IColLayout {
  span?: number
  xl?: number
  lg?: number
  md?: number
  sm?: number
  xs?: number
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: IColLayout
}
