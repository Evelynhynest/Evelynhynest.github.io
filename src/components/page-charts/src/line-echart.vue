<template>
  <div class="bar-echart">
    <base-echart :options="option" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Ref } from 'vue'
import type { EChartsOption } from 'echarts'

import BaseEchart from '@/base-ui/base-echart'

const props = withDefaults(
  defineProps<{
    title?: string
    lineData: any[]
    xLabels: string[]
  }>(),
  {
    title: ''
  }
)
const option: Ref<EChartsOption> = computed(() => {
  return {
    title: {
      text: props.title
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.xLabels
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '类别销量',
        data: props.lineData,
        type: 'line',
        emphasis: {
          focus: 'series'
        },
        areaStyle: {}
      }
    ]
  }
})
</script>

<style scoped></style>
