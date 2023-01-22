<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :pageName="pageName"
      :contentTabelConfig="contentTabelConfig"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTabelConfig } from './config/content.config'

export default defineComponent({
  name: 'role',
  setup() {
    const pageName = 'role'
    return {
      pageName,
      searchFormConfig,
      contentTabelConfig
    }
  }
})
</script>

<style scoped></style>
