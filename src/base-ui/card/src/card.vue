<template>
  <div class="yn-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ title }}</span>
        </div>
      </template>
      <div class="card-content">
        <slot></slot>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.yn-card {
  margin-bottom: 20px;
}
:deep(.el-card__header) {
  padding: 12px 0 12px 20px !important;
}
.el-card__header span {
  font-size: 16px;
  font-weight: bold;
}
:deep(.el-card__body) {
  padding: 20px !important;
  line-height: 1.5 !important;
  font-size: 14px !important;
}
</style>
