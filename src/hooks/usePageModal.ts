import { ref } from 'vue'
import type PageModal from '@/components/page-modal'

type callbackFn = (item?: any) => void

export function usePageModal(newCb?: callbackFn, editCb?: callbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    // pageModalRef.value!.dialogVisible = true
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.modalTitle = `新建${pageModalRef.value.title ?? ''}`
      pageModalRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    // pageModalRef.value!.dialogVisible = true
    if (pageModalRef.value) {
      pageModalRef.value.modalTitle = `编辑${pageModalRef.value.title ?? ''}`
      pageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return { pageModalRef, defaultInfo, handleEditData, handleNewData }
}
