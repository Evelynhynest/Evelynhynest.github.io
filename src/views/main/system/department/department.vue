<template>
  <div class="department">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="department"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :modalFormConfig="modalFormConfigRef"
      pageName="department"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { useLoginStore } from '@/stores/login/login'

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()

// modal配置信息
const loginStore = useLoginStore()
const modalFormConfigRef = computed(() => {
  const parentIdItem = modalFormConfig.formItems?.find(
    (item) => item.field === 'parentId'
  )
  parentIdItem!.options = loginStore.entireDepartment.map((item) => {
    return { label: item.name, value: item.id }
  })
  return modalFormConfig
})

// 处理modal的hook
const { pageModalRef, defaultInfo, handleEditData, handleNewData } =
  usePageModal()
</script>

<style scoped></style>
