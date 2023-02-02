<template>
  <div class="description">
    <el-descriptions :title="title" :column="column" border>
      <template v-for="(item, index) in tableData" :key="index">
        <el-descriptions-item>
          <template #label>{{ item.name }}</template>
          <el-tag size="small" v-if="item.description">{{
            item.description
          }}</el-tag>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    title?: string
    column?: number
    tableData: any[]
  }>(),
  {
    title: '',
    column: 1
  }
)
</script>

<style scoped>
.description {
  margin-bottom: 20px;
}
</style>
