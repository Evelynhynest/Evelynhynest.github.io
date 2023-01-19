<template>
  <div class="page-search">
    <yn-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2 class="page-header">高级检索</h2>
      </template>
      <template #footer>
        <div class="page-btns">
          <el-button
            ><el-icon><Refresh /></el-icon>&nbsp;重置</el-button
          >
          <el-button type="primary"
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

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      reuired: true
    }
  },
  components: {
    YnForm
  },
  setup() {
    const formData = ref({
      id: '',
      username: '',
      password: '',
      status: '',
      createTime: ''
    })

    return {
      formData
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
