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

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

import { searchFormConfig } from './config/search.config'
import { contentTabelConfig } from './config/content.config'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch
  },
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
