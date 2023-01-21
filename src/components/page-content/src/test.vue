<template>
  <div>
    <h2>Test</h2>
    <div class="test-vBind" v-bind="contentTabelConfig"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    contentTabelConfig: {
      type: Object
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
