import type { RouteRecordRaw } from 'vue-router'
import type { IUserMenusItem } from '@/service/login/types'
import type { IBreadcrumb } from '@/base-ui/breadcrumb'

let firstMenu: any

export default function mapMenusToRoutes(userMenus: any[]) {
  const routes: RouteRecordRaw[] = []

  interface IRouteModule {
    default: RouteRecordRaw
  }

  // 1.先加载默认所有的routes、
  const allRoutes: RouteRecordRaw[] = []
  // 自动引入router/main文件夹下所有.ts文件（深度递归查找）
  const routeModules = import.meta.glob<IRouteModule>(
    '../router/main/**/*.ts',
    { eager: true }
  )
  for (const module in routeModules) {
    const route = routeModules[module].default
    allRoutes.push(route)
  }

  // 2.根据菜单获取需要添加的routes
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      // type为2，表示el-menu-item，没有子路由
      if (menu.type === 2) {
        if (!firstMenu) {
          firstMenu = menu
        }
        // 从导入的所有路由中找到路径与menu的url匹配的那一个
        const route = allRoutes.find((route) => route.path === menu.url)
        // 如果找到就添加到最后返回的动态路由数组中
        // route && routes.push(route)
        if (route) routes.push(route)
      } else {
        // type为1，表示el-sub-menu，递归children直到没有children
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function pathMapToMenu(
  userMenus: IUserMenusItem[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
): IUserMenusItem | void {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        if (breadcrumbs) {
          // breadcrumbs.push({ name: menu.name, path: menu.url })
          breadcrumbs.push({ name: menu.name })
          breadcrumbs.push({ name: findMenu.name })
        }
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

export function pathMapToBreadcrumb(
  userMenus: IUserMenusItem[],
  currentPath: string
) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type === 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}

export function mapMenusToLeafKeys(menuList: any[]) {
  const leafKeys: number[] = []
  const _recurseGetLeafKeys = (menuList: any) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeafKeys(menu.children)
      } else {
        leafKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeafKeys(menuList)
  return leafKeys
}

export { firstMenu }
