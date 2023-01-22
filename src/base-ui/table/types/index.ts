export interface IPropItem {
  prop?: string
  label: string
  minWidth?: string | number
  slotName?: string
}

export interface ITreeProps {
  children: string
  hasChildren?: string
}
export interface IChildrenProps {
  rowKey: string
  treeProps: ITreeProps
}

export interface ITable {
  tableTitle: string
  propList: IPropItem[]
  showSelectionColumn?: boolean
  showIndexColumn?: boolean
  childrenProps?: IChildrenProps
  showFooter?: boolean
}
