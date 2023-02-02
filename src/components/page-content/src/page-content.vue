<template>
  <div class="page-content">
    <yn-table
      v-bind="contentTableConfig"
      :listData="dataList"
      :listCount="dataCount"
      v-model:page="pageInfo"
      @selectionChange="selectionChange"
    >
      <!-- 1.header中的插槽 -->
      <template #headerHandler>
        <el-button @click="refreshPage"
          ><el-icon><Refresh /></el-icon>&nbsp;刷新
        </el-button>
        <el-button type="primary" v-if="isCreate" @click="handleNewClick"
          ><el-icon><Plus /></el-icon>&nbsp;新建
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
      <template #handler="{ row }">
        <div class="handler-btns">
          <el-link type="primary" v-if="isUpdate" @click="handleEditClick(row)"
            ><el-icon><Edit /></el-icon>编辑</el-link
          >
          <el-link
            type="danger"
            v-if="isDelete"
            @click="handleDeleteClick(row)"
          >
            <el-icon><Delete /></el-icon>删除
          </el-link>
        </div>
      </template>

      <!-- 3.跨组件动态插槽 -->
      <template
        v-for="propItem in otherPropSlots"
        :key="propItem.prop"
        #[propItem.slotName!]="{ row }"
      >
        <slot :name="propItem.slotName" :row="row"></slot>
      </template>
    </yn-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'

import YnTable from '@/base-ui/table'

import { useSystemStore } from '@/stores/main/system/system'
import { usePermission } from '@/hooks/usePermission'

import type { PropType } from 'vue'
import type { ITable } from '@/base-ui/table'

export default defineComponent({
  name: 'page-content',
  components: {
    YnTable
  },
  props: {
    contentTableConfig: {
      // type: Object,
      type: Object as PropType<ITable>,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const systemStore = useSystemStore()

    // 0.获取操作的权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')
    console.log(isUpdate)

    // 1.双向绑定pageInfo
    const pageInfo = ref({
      pageSize: 10,
      currentPage: 1
    })
    // 监听pageInfo的变化，发送请求获取数据
    watch(pageInfo, () => {
      getPageData()
    })

    const selectionChange = (value: any) => {
      console.log('selectionChange:', value)
    }

    // 2.发送网络请求，封装一个函数方便多次调用
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      systemStore.getPageListAction({
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 3.从store中获取数据
    const dataList = computed(() => systemStore.pageListData(props.pageName))

    // const userCount = computed(() => systemStore.userCount)
    const dataCount = computed(() => systemStore.pageListCount(props.pageName))

    // 4.筛选出每个配置文件自己独有的动态插槽
    const otherPropSlots = props.contentTableConfig.propList.filter((item) => {
      // 过滤出去没有slotName属性的item
      if (!item.slotName) return false
      // 过滤出去固定展示的公共item
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })

    const refreshPage = () => {
      getPageData()
    }

    // 5.删除/编辑/新建按钮逻辑
    const handleDeleteClick = (item: any) => {
      systemStore.deletePageDataAction({
        pageName: props.pageName,
        id: item.id
      })
    }

    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    const handleNewClick = () => {
      emit('newBtnClick')
    }

    return {
      dataList,
      dataCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      getPageData,
      refreshPage,
      selectionChange,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
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
