<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      pageName="role"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    />
    <page-modal
      ref="pageModalRef"
      :modalFormConfig="modalFormConfig"
      pageName="role"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="role-tree">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useLoginStore } from '@/stores/login/login'
import { mapMenusToLeafKeys } from '@/utils/map-menus'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalFormConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'
import type { ElTree } from 'element-plus'

export default defineComponent({
  name: 'role',
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    // 1.处理pageModal的hook
    const editCallback = (item: any) => {
      // console.log('role editCallback:', item)
      // 需要组件挂载后才能拿到ref绑定的组件对象调用方法
      nextTick(() => {
        const leafKeys = mapMenusToLeafKeys(item.menuList)
        // console.log(elTreeRef.value)
        elTreeRef.value!.setCheckedKeys(leafKeys)
      })
    }
    const { pageModalRef, defaultInfo, handleNewData, handleEditData } =
      usePageModal(undefined, editCallback)

    const loginStore = useLoginStore()
    const menus = computed(() => loginStore.entireMenu)

    const otherInfo = ref({})

    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }

    return {
      searchFormConfig,
      contentTableConfig,
      modalFormConfig,
      pageModalRef,
      defaultInfo,
      menus,
      otherInfo,
      elTreeRef,
      handleNewData,
      handleEditData,
      handleCheckChange
    }
  }
})
</script>

<style scoped>
.role-tree {
  margin-left: 30px;
}
</style>
