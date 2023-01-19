<template>
  <div class="user-info">
    <el-dropdown class="user-info__dropdown">
      <span class="user-info-display">
        <el-avatar :size="25" :src="circleUrl" />
        <span>{{ username }}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    username: {
      type: String,
      required: true
    }
  },
  setup() {
    const circleUrl = ref(
      'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    )

    return {
      circleUrl
    }
  }
})
</script>

<style scoped lang="less">
.user-info__dropdown {
  cursor: pointer;
  .user-info-display {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
