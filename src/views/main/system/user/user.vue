<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTabelConfig="contentTabelConfig"
      pageName="users"
    >
      <template #status="{ row }">
        <el-button :type="row.enable ? 'success' : 'danger'" size="small">{{
          row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTabelConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'user',
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    return {
      searchFormConfig,
      contentTabelConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick
    }
  }
})
</script>

<style scoped lang="less"></style>
