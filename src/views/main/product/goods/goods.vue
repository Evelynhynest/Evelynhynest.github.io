<template>
  <page-content :contentTabelConfig="contentTabelConfig" pageName="goods">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentTabelConfig } from './config/content.config'

export default defineComponent({
  setup() {
    return {
      contentTabelConfig
    }
  }
})
</script>

<style scoped></style>
