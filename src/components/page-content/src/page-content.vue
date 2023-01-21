<template>
  <div class="page-content">
    <yn-table
      v-bind="contentTabelConfig"
      :listData="dataList"
      :listCount="dataCount"
      v-model:page="pageInfo"
      @selectionChange="selectionChange"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button
          ><el-icon><Refresh /></el-icon>&nbsp;刷新
        </el-button>
        <el-button type="primary"
          ><el-icon><Plus /></el-icon>&nbsp;创建用户
        </el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #status="{ row }">
        <el-button :type="row.enable ? 'success' : 'danger'" size="small">{{
          row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="{ row }">
        <span>{{ $filters.formatTime(row.createAt) }}</span>
      </template>
      <template #updateAt="{ row }">
        <span>{{ $filters.formatTime(row.updateAt) }}</span>
      </template>
      <template #handler>
        <div class="handler-btns">
          <el-link type="primary"
            ><el-icon><Edit /></el-icon>编辑</el-link
          >
          <el-link type="danger"
            ><el-icon><Delete /></el-icon>删除</el-link
          >
        </div>
      </template>
    </yn-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'

import YnTable from '@/base-ui/table'

import { useSystemStore } from '@/stores/main/system/system'

import type { PropType } from 'vue'
import type { ITable } from '@/base-ui/table'

export default defineComponent({
  components: {
    YnTable
  },
  props: {
    contentTabelConfig: {
      // type: Object,
      type: Object as PropType<ITable>,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const systemStore = useSystemStore()

    // 双向绑定pageInfo
    const pageInfo = ref({
      pageSize: 10,
      currentPage: 0
    })
    // 监听pageInfo的变化，发送请求获取数据
    watch(pageInfo, () => {
      getPageData()
    })

    const selectionChange = (value: any) => {
      console.log('selectionChange:', value)
    }

    /* systemStore.getPageListAction({
      pageUrl: '/users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    }) */

    // 发送网络请求，封装一个函数方便多次调用
    const getPageData = (queryInfo: any = {}) => {
      systemStore.getPageListAction({
        pageName: props.pageName,
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 从store中获取数据
    const dataList = computed(() => systemStore.pageListData(props.pageName))

    // const userCount = computed(() => systemStore.userCount)
    const dataCount = computed(() => systemStore.pageListCount(props.pageName))

    return {
      dataList,
      dataCount,
      pageInfo,
      getPageData,
      selectionChange
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  padding: 20px;
  border-top: 20px solid #f0f2f5;

  .handler-btns {
    display: flex;
    justify-content: space-around;

    .el-link {
      font-size: 12px !important;
    }
  }
}
</style>
