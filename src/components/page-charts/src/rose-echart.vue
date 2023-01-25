<template>
  <div class="rose-echart">
    <base-echart :options="options" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Ref } from 'vue'
import BaseEchart from '@/base-ui/base-echart'
import type { EChartsOption } from 'echarts'
import type { IDataType } from '../types'

const props = defineProps<{
  roseData: IDataType[]
}>()
const options: Ref<EChartsOption> = computed(() => {
  return {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true }
      }
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [10, 80],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 4
        },
        data: props.roseData
      }
    ]
  }
})
</script>

<style scoped></style>
