<template>
  <div class="chat">
    <yn-tinymce v-model:value="htmlString" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import YnTinymce from '@/base-ui/tinymce'
const htmlString = ref<string>('请留下您的宝贵意见~')
watch(htmlString, (newValue) => {
  console.log('htmlString in chat:', newValue)
})
</script>

<style scoped>
.chat {
  width: 100%;
  height: 100%;
}
</style>
