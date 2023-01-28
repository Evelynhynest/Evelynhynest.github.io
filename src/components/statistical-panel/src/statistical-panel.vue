<template>
  <div class="statistical">
    <div class="header">
      <span>{{ panelData.title }}</span>
      <el-tooltip :content="panelData.tips" placement="top" effect="light">
        <el-icon><Warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <yn-counter-up
        :number="panelData.number1"
        :option="
          panelData.amount === 'saleroom' ? counterOption2 : counterOption1
        "
      />
    </div>
    <div class="footer">
      <span>
        {{ panelData.subtitle }}&nbsp;
        <yn-counter-up
          :number="panelData.number1"
          :option="
            panelData.amount === 'saleroom' ? counterOption2 : counterOption1
          "
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import YnCounterUp from '@/base-ui/countup'
withDefaults(
  defineProps<{
    panelData: any
  }>(),
  {
    panelData: () => ({})
  }
)
const counterOption1 = {
  decimalPlaces: 0,
  prefix: '',
  suffix: ' 件'
}
const counterOption2 = {
  decimalPlaces: 0,
  prefix: '￥'
}
</script>

<style scoped lang="less">
.statistical {
  display: flex;
  flex-direction: column;
  height: 130px;
  // box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  padding: 20px;
  margin-bottom: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #aaa;
  }
  .content {
    padding: 12px 0;
    font-size: 20px;
    border-bottom: 1px solid #eee;
  }
  .footer {
    margin-top: 10px;
  }
}
</style>
