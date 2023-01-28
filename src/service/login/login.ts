import ynRequest from '../index'
import type { IAccount, ILoginResult, IUserMenusItem } from './types'
import type { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users',
  UserMenus = '/role'
}

export function accountLoginRequest(account: IAccount) {
  return ynRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: {
      name: account.username,
      password: account.password
    }
  })
}

export function requestUserInfoById(id: number) {
  return ynRequest.get<IDataType>({
    url: `${LoginAPI.LoginUserInfo}/${id}`,
    showLoading: false
  })
}

export function requestUserMenusById(id: number) {
  return ynRequest.get<IDataType<IUserMenusItem[]>>({
    url: `${LoginAPI.UserMenus}/${id}/menu`,
    showLoading: false
  })
}
