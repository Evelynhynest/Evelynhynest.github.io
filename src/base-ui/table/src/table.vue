<template>
  <div class="yn-table">
    <div class="table-header">
      <slot name="header">
        <div class="table-header-title">
          <span>{{ tableTitle }}</span>
        </div>
        <div class="table-header-handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      border
      style="width: 100%"
      :data="listData"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectionColumn"
        type="selection"
        min-width="68"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        label="序号"
        type="index"
        min-width="68"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="{ row }">
            <slot :name="propItem.slotName" :row="row">{{
              propItem.prop && row[propItem.prop]
            }}</slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="table-footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { IPropItem } from '../'

export default defineComponent({
  props: {
    tableTitle: {
      type: String,
      required: true
    },
    listData: {
      type: Array,
      required: true
    },
    listCount: {
      type: Number,
      required: true
    },
    propList: {
      type: Array as PropType<IPropItem[]>,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectionColumn: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ pageSize: 10, currentPage: 1 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }

    const handleSizeChange = (pageSize: number) => {
      emit('update:page', { ...props.page, pageSize })
    }
    const handleCurrentChange = (currentPage: number) => {
      emit('update:page', { ...props.page, currentPage })
    }

    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  .table-header-title {
    font-size: 20px;

    span {
      padding-bottom: 6px;
      padding-right: 12px;
      border-bottom: 3px solid rgb(121, 187, 255);
    }
  }
}
.table-footer {
  display: flex;
  justify-content: center;
  .el-pagination {
    margin-top: 25px;
    align-items: right;
  }
}
</style>
