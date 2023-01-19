export interface IAccount {
  username: string
  password: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IUserMenusItem {
  children?: IUserMenusItem[]
  icon?: string
  id: number
  name: string
  parentId?: number
  sort: number
  type: number
  url: string
}
