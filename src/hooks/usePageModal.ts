import { ref } from 'vue'
import pageModal from '@/components/page-modal'
type CallbackFn = (item?: any) => void
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const defaultInfo = ref({})
  const pageModalRef = ref<InstanceType<typeof pageModal>>()
  const handleNewClick = () => {
    if (pageModalRef.value) {
      defaultInfo.value = {}
      pageModalRef.value.dialogVisible = true
      newCb && newCb()
    }
  }
  const handleEditClick = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
      editCb && editCb(item)
    }
  }
  return [defaultInfo, pageModalRef, handleNewClick, handleEditClick]
}
