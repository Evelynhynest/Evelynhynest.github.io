<template>
  <div>
    <Editor
      :id="tinymceId"
      v-model="myValue"
      :init="init"
      :disabled="disabled"
    ></Editor>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，
import Editor from '@tinymce/tinymce-vue' //编辑器引入
import 'tinymce/themes/silver/theme' //编辑器主题
import 'tinymce/icons/default' //引入编辑器图标icon
import 'tinymce/plugins/link' //超链接
import 'tinymce/plugins/image' //插入编辑图片
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/charmap' //特殊字符
import 'tinymce/plugins/media' //插入编辑媒体
import 'tinymce/plugins/wordcount' // 字数统计
import 'tinymce/plugins/table'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/preview'
const props = withDefaults(
  defineProps<{
    value?: string
    disabled?: boolean
    plugins?: string[] | string
    toolbar?: string[] | string
  }>(),
  {
    value: '',
    disabled: false,
    plugins: () => ['lists', 'advlist', 'autolink', 'link'],
    toolbar:
      'undo redo |  formatselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent lists image | fullscreen | preview'
  }
)
const myValue = ref('')
const tinymceId = ref('')
const init = {
  selector: '#tinymce',
  base_url: '/tinymce',
  language_url: '/tinymce/langs/zh-Hans.js', // 语言包的路径
  language: 'zh-Hans', //语言
  skin_url: '/tinymce/skins/ui/oxide', // skin路径
  plugins: props.plugins, //插件 //工具栏
  toolbar: props.toolbar,
  toolbar_location: '/',
  fontsize_formats:
    '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
  height: 500, //高度
  placeholder: props.value ?? '请输入内容......',
  branding: false //隐藏右下角技术支持
}
onMounted(() => {
  tinymce.init({})
})
const emit = defineEmits(['update:value'])
watch(myValue, (newValue) => {
  // console.log('myValue in tinymce', myValue.value)
  emit('update:value', newValue)
  // myValue.value = props.value
})
watch(
  () => props.value,
  (newValue) => {
    // console.log('newValue', newValue)
    myValue.value = newValue
  }
)
</script>
