<template>
  <div class="yn-table">
    <el-table :data="listData" border style="width: 100%">
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center">
          <template #default="{ row }">
            <slot :name="propItem.slotName" :row="row">{{
              row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { propItem } from '../'

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array as PropType<propItem[]>,
      required: true
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
