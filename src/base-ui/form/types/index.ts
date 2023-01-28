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
  isHidden?: boolean
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
  title?: string
  formItems: IFormItem[]
  labelWidth?: string
  itemStyle?: any
  colLayout?: IColLayout
}
