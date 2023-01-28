<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @editBtnClick="handleEditData"
      @newBtnClick="handleNewData"
    >
      <template #status="{ row }">
        <el-button :type="row.enable ? 'success' : 'danger'" size="small">{{
          row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
    </page-content>
    <page-modal
      :modalFormConfig="modalFormConfigRef"
      title="新建用户"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'

import { useLoginStore } from '@/stores/login/login'

export default defineComponent({
  name: 'user',
  setup() {
    const { pageContentRef, handleResetClick, handleQueryClick } =
      usePageSearch()

    // pageModal相关的hook逻辑
    const newCallback = () => {
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const editCallback = () => {
      const passwordItem = modalFormConfig.formItems.find(
        (item) => item.field === 'password'
      )
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }

    // 2.动态获取部门和角色列表
    const loginStore = useLoginStore()
    // 将modalFormConfig通过computed的副作用函数返回，变成可响应式对象
    // 把对配置文件的操作放入副作用函数中
    // 一旦里面，对状态管理仓库有依赖的代码，中的数据发生改变，副作用函数就会重新执行
    // 而重新执行之后会返回新的modalFormConfig，里面有修改后想要展示的数据
    const modalFormConfigRef = computed(() => {
      const departmentItem = modalFormConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = loginStore.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalFormConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = loginStore.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalFormConfig
    })

    // 3.调用hook获取公共变量和函数
    const { pageModalRef, defaultInfo, handleEditData, handleNewData } =
      usePageModal(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      modalFormConfigRef,
      pageContentRef,
      pageModalRef,
      defaultInfo,
      handleQueryClick,
      handleResetClick,
      handleEditData,
      handleNewData
    }
  }
})
</script>

<style scoped lang="less"></style>
