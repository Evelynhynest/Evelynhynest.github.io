<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <yn-card title="分类商品数量">
          <pie-echart :pieData="categoryGoodsCount" />
        </yn-card>
      </el-col>
      <el-col :span="10">
        <yn-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale" />
        </yn-card>
      </el-col>
      <el-col :span="7">
        <yn-card title="分类商品数量">
          <rose-echart :roseData="categoryGoodsCount" />
        </yn-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <yn-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale" />
        </yn-card>
      </el-col>
      <el-col :span="12">
        <yn-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor" />
        </yn-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useAnalysisStore } from '@/stores/main/analysis/analysis'

import YnCard from '@/base-ui/card'
import { PieEchart } from '@/components/page-charts'
import { RoseEchart } from '@/components/page-charts'
import { LineEchart } from '@/components/page-charts'
import { BarEchart } from '@/components/page-charts'
import { MapEchart } from '@/components/page-charts'

export default defineComponent({
  name: 'dashboard',
  components: {
    YnCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    const analysisStore = useAnalysisStore()
    analysisStore.getDashboardDataAction()
    const categoryGoodsCount = computed(() =>
      analysisStore.categoryGoodsCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    )
    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const lineData: any[] = []
      analysisStore.categoryGoodsSale.forEach((item) => {
        xLabels.push(item.name)
        lineData.push(item.goodsCount)
      })
      return { xLabels, lineData }
    })

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const barData: any[] = []
      analysisStore.categoryGoodsFavor.forEach((item) => {
        xLabels.push(item.name)
        barData.push(item.goodsFavor)
      })
      return { xLabels, barData }
    })

    const addressGoodsSale = computed(() => {
      return analysisStore.addressGoodsSale.map((item) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
