<template>
  <div class="category">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="category"
      ref="pageContentRef"
      @editBtnClick="handleEditData"
      @newBtnClick="handleNewData"
    ></page-content>
    <page-modal
      :modalFormConfig="modalFormConfig"
      title="新建商品"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch()
const { pageModalRef, defaultInfo, handleEditData, handleNewData } =
  usePageModal()
</script>

<style scoped></style>
