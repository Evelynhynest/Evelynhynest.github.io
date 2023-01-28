<template>
  <div class="code">
    <pre class="bg">
      <!-- <code :class="'language'+language">{{ highlightedCode }}</code> -->
      <code :class="'language'+language" v-html="highlightedCode" />
    </pre>
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const props = withDefaults(
  defineProps<{
    language?: string
    code?: string
  }>(),
  {
    language: 'html',
    code: ''
  }
)
const highlightedCode = ref<string>('')
watchEffect(() => {
  highlightedCode.value = hljs.highlight(props.code, {
    language: props.language
  }).value
})
</script>

<style scoped></style>
