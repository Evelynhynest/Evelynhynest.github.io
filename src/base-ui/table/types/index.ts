export interface IPropItem {
  prop?: string
  label: string
  minWidth?: string | number
  slotName?: string
}

export interface ITable {
  tableTitle: string
  propList: IPropItem[]
  showSelectionColumn?: boolean
  showIndexColumn?: boolean
}
