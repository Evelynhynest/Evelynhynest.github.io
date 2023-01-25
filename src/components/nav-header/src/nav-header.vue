<template>
  <div class="nav-header">
    <i class="nav-header-fold" @click="handleFoldClick">
      <el-icon v-show="isFold" size="27"><Fold /></el-icon>
      <el-icon v-show="!isFold" size="27"><Expand /></el-icon>
    </i>
    <div class="nav-header-content">
      <yn-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info :username="username" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import YnBreadcrumb from '@/base-ui/breadcrumb'
import userInfo from './user-info.vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/login/login'
import { pathMapToBreadcrumb } from '@/utils/map-menus'
// 监听按钮点击调用updateSize，动态调整echarts大小
// import useEchart from '@/base-ui/base-echart/src/hooks/useEchart'

export default defineComponent({
  components: {
    YnBreadcrumb,
    userInfo
  },
  emits: ['handleNavMenu'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('handleNavMenu', isFold.value)
    }

    const loginStore = useLoginStore()
    const username = loginStore.userInfo.name

    // 当依赖的currentPath和userMenus发生改变时
    // breadcrumbs也需要发生响应式变化
    const breadcrumbs = computed(() => {
      const route = useRoute()
      const currentPath = route.path
      const userMenus = loginStore.userMenus
      return pathMapToBreadcrumb(userMenus, currentPath)
    })

    return {
      isFold,
      handleFoldClick,
      username,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;

  &-fold {
    cursor: pointer;
  }
  &-content {
    display: flex;
    margin-left: 10px;
    align-items: center;
    justify-content: space-between;
    flex: 1;
  }
}
</style>
