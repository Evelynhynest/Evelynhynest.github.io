<template>
  <div class="nav-menu">
    <div class="nav-menu__logo">
      <img class="nav-menu__logo-img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!isCollapse" class="nav-menu__logo-title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultMenu"
      class="nav-menu__menu"
      active-text-color="#fff"
      background-color="#001529"
      text-color="#ccc"
      :collapse="isCollapse"
      :collapse-transition="false"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <!-- 二级菜单 -->
          <el-sub-menu :index="`${item.id}`" class="nav-menu__menu-sub">
            <template #title>
              <el-icon v-if="item.icon.indexOf('monitor') !== -1"
                ><Monitor
              /></el-icon>
              <el-icon v-if="item.icon.indexOf('setting') !== -1"
                ><Setting
              /></el-icon>
              <el-icon v-if="item.icon.indexOf('goods') !== -1"
                ><Goods
              /></el-icon>
              <el-icon v-if="item.icon.indexOf('chat') !== -1"
                ><ChatLineRound
              /></el-icon>
              <span class="nav-menu__menu-sub-title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="`${subItem.id}`"
                class="nav-menu__menu-item"
                @click="handleMenuItemClick(subItem)"
                >{{ subItem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="`${item.id}`">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useLoginStore } from '@/stores/login/login'
import { useRouter, useRoute } from 'vue-router'
import type { IUserMenusItem } from '@/service/login/types'
import { pathMapToMenu } from '@/utils/map-menus'

export default defineComponent({
  props: {
    isCollapse: {
      type: Boolean,
      default: () => false
    }
  },
  setup() {
    // store
    const loginStore = useLoginStore()
    const userMenus = computed(() => loginStore.userMenus)

    // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    const currentMenu = pathMapToMenu(userMenus.value, currentPath)

    // data
    const defaultMenu = ref(`${currentMenu?.id}`)

    // event handle
    const handleMenuItemClick = (subItem: IUserMenusItem) => {
      router.push({
        path: subItem.url ?? '/not-found'
      })
    }

    return {
      userMenus,
      handleMenuItemClick,
      defaultMenu
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  color: #fff;
  background-color: #001529 !important;

  &__logo {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 48px;
    padding: 12px 10px 8px 10px;

    &-img {
      height: 28px;
      margin: 0 10px;
    }

    &-title {
      font-size: 16px;
      font-weight: 700;
    }
  }

  .nav-menu__menu {
    border-right: none;
    // background-color: inherit;
    &:not(.el-menu--collapse) {
      // width: 200px;
      // min-height: 400px;
      width: 100%;
      height: calc(100% - 48px);
    }
    // .el-menu-vertical:not(.el-menu--collapse) {
    // width: 100%;
    // height: calc(100% - 48px);
    // }

    &-sub {
      background-color: #001529 !important;
      .el-sub-menu__title {
        & > * {
          color: #ccc !important;
        }
      }

      .el-menu--collapse &-title {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }
    }

    :deep(.el-sub-menu__title:hover) {
      background-color: rgb(71, 86, 114) !important;
    }

    &-item {
      color: #ccc;
      padding-left: 50px !important;
      background-color: rgba(0, 21, 41, 0.85);

      .el-menu--collapse & {
        height: 0;
        width: 0;
        overflow: hidden;
        visibility: hidden;
        display: inline-block;
      }

      &:hover {
        color: #fff;
        background-color: #0a60bd !important;
      }

      &.is-active {
        color: #fff !important;
        background-color: #0a60bd !important;
      }
    }
  }
}
</style>
