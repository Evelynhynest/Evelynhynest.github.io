<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <div class="user-content">
      <yn-table :listData="userList" :propList="propList">
        <template #status="{ row }">
          <el-button>{{ row.enable ? '启用' : '禁用' }}</el-button>
        </template>
        <template #createAt="{ row }">
          <strong>{{ row.createAt }}</strong>
        </template>
        <template #updateAt="{ row }">
          <i>{{ row.updateAt }}</i>
        </template>
      </yn-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useSystemStore } from '@/stores/main/system/system'

import pageSearch from '@/components/page-search'
import YnTable from '@/base-ui/table'

import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    pageSearch,
    YnTable
  },
  setup() {
    const systemStore = useSystemStore()
    systemStore.getPageListAction({
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    const userList = computed(() => systemStore.userList)
    const userCount = computed(() => systemStore.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '180' },
      { prop: 'realname', label: '真实姓名', minWidth: '180' },
      { prop: 'enable', label: '状态', minWidth: '180', slotName: 'status' },
      { prop: 'cellphone', label: '电话', minWidth: '180' },
      {
        prop: 'createAt',
        label: '创建时间',
        minWidth: '250',
        slotName: 'createAt'
      },
      {
        prop: 'updateAt',
        label: '更新时间',
        minWidth: '250',
        slotName: 'updateAt'
      }
    ]

    return {
      searchFormConfig,
      userList,
      propList
    }
  }
})
</script>

<style scoped>
.user-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;
}
</style>
