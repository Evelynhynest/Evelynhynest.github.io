<template>
  <div class="main">
    <el-container class="main-container">
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <nav-menu :isCollapse="isCollapse" />
      </el-aside>
      <el-container class="main-page">
        <el-header class="main-page-header">
          <nav-header @handleNavMenu="handleNavMenu" />
        </el-header>
        <el-main class="main-page-content">
          <div class="main-page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'
const isCollapse = ref(false)
const handleNavMenu = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style scoped lang="less">
@mainColor: #001529;
.main {
  height: 100%;
  width: 100%;

  .main-container {
    height: 100%;
  }

  .el-aside {
    min-height: 100vh;
    height: 100%;
    background-color: @mainColor !important;
    transition: width 0.15s;
  }
  .main-page {
    min-height: 100vh;
    height: 100%;
    flex-direction: column;
    .el-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #333;
      height: 48px !important;
    }
    .main-page-content {
      height: calc(100% - 48px);

      .main-page-info {
        background-color: #fff;
      }
    }
    .el-main {
      background-color: #f0f2f5;
    }
  }
}
</style>
