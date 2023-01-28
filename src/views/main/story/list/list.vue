<template>
  <div class="list">
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="story"
    ></page-content>
  </div>
</template>

<script lang="ts" setup>
import { contentTableConfig } from './config/content.config'
</script>

<style scoped></style>
