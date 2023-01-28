<template>
  <page-content
    :contentTableConfig="contentTableConfig"
    pageName="goods"
    @editBtnClick="handleEditData"
    @newBtnClick="handleNewData"
  >
    <template #oldPrice="{ row }">
      <span>￥{{ row.oldPrice }}</span>
    </template>
    <template #newPrice="{ row }">
      <span>￥{{ row.newPrice }}</span>
    </template>
    <template #image="{ row }">
      <el-image
        style="width: 100px; height: 100px"
        :src="row.imgUrl"
        :zoom-rate="1.2"
        :preview-src-list="[row.imgUrl]"
        :initial-index="4"
        fit="cover"
      />
    </template>
    <template #status="{ row }">
      <el-button :type="row.status ? 'success' : 'danger'" size="small">{{
        row.status ? '上架' : '下架'
      }}</el-button>
    </template>
  </page-content>
  <page-modal
    :modalFormConfig="modalFormConfig"
    title="新建商品"
    ref="pageModalRef"
    :defaultInfo="defaultInfo"
    pageName="users"
  ></page-modal>
</template>

<script lang="ts" setup>
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'

const { pageModalRef, defaultInfo, handleEditData, handleNewData } =
  usePageModal()
</script>

<style scoped></style>
