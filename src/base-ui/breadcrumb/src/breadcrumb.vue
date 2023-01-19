<template>
  <div class="yn-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.name">
        <template v-if="breadcrumb.path">
          <el-breadcrumb-item :to="{ path: breadcrumb.path }">{{
            breadcrumb.name
          }}</el-breadcrumb-item>
        </template>
        <template v-else>
          <el-breadcrumb-item>{{ breadcrumb.name }}</el-breadcrumb-item>
        </template>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { IBreadcrumb } from './types'

export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
