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
:deep(.el-card__header) {
  padding: 10px 0 10px 10px !important;
}
.el-card__header span {
  font-size: 14px;
}
</style>
