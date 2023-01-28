<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="modalTitle"
      width="30%"
      center
      destroy-on-close
    >
      <yn-form v-model="formData" v-bind="modalFormConfig" />
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import YnForm from '@/base-ui/form'
import { useSystemStore } from '@/stores/main/system/system'

export default defineComponent({
  name: 'page-modal',
  components: {
    YnForm
  },
  props: {
    modalFormConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const formData = ref<any>({})
    const title = ref(props.modalFormConfig.title)
    const modalTitle = ref('')
    const dialogVisible = ref(false)

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalFormConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定按钮的逻辑（区分新建与编辑的确定按钮）
    const systemStore = useSystemStore()
    const handleConfirmClick = () => {
      dialogVisible.value = false
      // 通过判断props.defaultInfo是否为空对象区分是新建还是编辑
      if (Object.keys(props.defaultInfo).length) {
        // 编辑的确认逻辑
        // console.log('编辑用户')
        // console.log(formData.value)
        systemStore.editPageDataAction({
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建的确认逻辑
        // console.log('新建用户')
        systemStore.createPageDataAction({
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      formData,
      title,
      modalTitle,
      dialogVisible,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
