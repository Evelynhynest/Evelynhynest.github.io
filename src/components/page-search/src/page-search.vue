<template>
  <div class="page-search">
    <yn-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="page-header">高级检索</h2>
      </template>
      <template #footer>
        <div class="page-btns">
          <el-button @click="handleResetClick"
            ><el-icon><Refresh /></el-icon>&nbsp;重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick"
            ><el-icon><Search /></el-icon>&nbsp;搜索</el-button
          >
        </div>
      </template>
    </yn-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import YnForm from '@/base-ui/form'
import type { PropType } from 'vue'
import type { IForm } from '@/base-ui/form'

export default defineComponent({
  name: 'page-search',
  components: {
    YnForm
  },
  props: {
    searchFormConfig: {
      // type: Object,
      type: Object as PropType<IForm>,
      required: true
    }
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来动态决定
    // 1.优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)

    // 2.优化二：应该监听用户点击重置的事件，并且实现数据重置
    const handleResetClick = () => {
      // formData.value = formOriginData
      for (const key in formOriginData) {
        formData.value[key] = formOriginData[key]
      }
      emit('resetBtnClick')
    }

    // 3.优化三：监听用户点击搜索的事件，根据表单信息发送请求获取匹配的数据
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.page-header {
  text-align: center;
}
.page-btns {
  text-align: right;
  padding: 0 18px 20px 0;
}
</style>
