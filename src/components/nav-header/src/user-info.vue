<template>
  <div class="user-info">
    <div class="user-info__icon">
      <el-icon @click="gotoStoryList"
        ><ChatLineRound /><span class="user-info__icon-count">3</span></el-icon
      >
    </div>
    <div class="user-info__icon">
      <el-icon @click="openMsg"
        ><Bell /><span class="user-info__icon-count">2</span></el-icon
      >
    </div>
    <el-dropdown class="user-info__dropdown">
      <span class="user-info-display">
        <el-avatar :size="25" :src="circleUrl" />
        <span>{{ username }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import localCache from '@/utils/localCache'
import { useRouter } from 'vue-router'

defineProps<{
  username: string
}>()
const circleUrl = ref(
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
)
const router = useRouter()
const handleExitClick = () => {
  localCache.deleteCache('token')
  localCache.deleteCache('userInfo')
  localCache.deleteCache('userMenus')
  router.push('/main')
}
const gotoStoryList = () => {
  router.push('/main/story/list')
}
const openMsg = () => {
  ElMessage('该功能还在开发中，敬请期待~')
}
</script>

<style scoped lang="less">
.user-info {
  display: flex;
  align-items: center;
  gap: 21px;
  font-size: 18px;
  .user-info__icon {
    margin-top: 6px;
    cursor: pointer;
    .user-info__icon-count {
      position: absolute;
      top: -6px;
      right: -10px;
      width: 18px;
      height: 14px;
      line-height: 14px;
      border-radius: 10px;
      color: #fff;
      font-size: 10px;
      font-style: normal;
      font-family: sans-serif;
      text-align: center;
      background-color: #fd544b;
    }
  }
  .user-info__dropdown {
    cursor: pointer;
    .user-info-display {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
</style>
