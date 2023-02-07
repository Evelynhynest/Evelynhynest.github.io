<template>
  <div class="chat">
    <yn-tinymce v-model:value="htmlString" />
    <div class="controller">
      <el-popconfirm
        width="220"
        confirm-button-text="是"
        cancel-button-text="否"
        title="您确定要清空当前输入内容吗，此操作不可撤销"
        @confirm="handleClear"
      >
        <template #reference>
          <el-button class="submit-btn">清空</el-button>
        </template>
      </el-popconfirm>
      <el-button class="submit-btn" type="primary" @click="handleSubmit"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { ref } from 'vue'
import YnTinymce from '@/base-ui/tinymce'
const htmlString = ref<string>('请留下您的宝贵意见~')
const handleClear = () => {
  htmlString.value = ''
  ElMessage({
    message: '内容已清空~',
    type: 'success'
  })
}
const handleSubmit = () => {
  ElMessage({
    message: '提交成功~',
    type: 'success'
  })
}
</script>

<style scoped lang="less">
.chat {
  width: 100%;
  height: 100%;
  .controller {
    display: flex;
    justify-content: end;
    .submit-btn {
      margin: 20px 20px 20px 0;
    }
  }
}
</style>
