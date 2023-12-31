<template>
  <div class="user">
    <pageSearch
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <pageContent
      ref="pageContentRef"
      :contentConfig="contentConfig"
      pageName="users"
      @handleEditClick="handleEditClick"
      @handleNewClick="handleNewClick"
    />
    <pageModal
      pageName="users"
      ref="pageModalRef"
      :modalConfig="modalConfigRef"
      :defaultInfo="defaultInfo"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { searchFormConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import pageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'
export default defineComponent({
  components: { pageSearch, pageContent, pageModal },
  setup() {
    // 处理密码的逻辑
    const passwordItem = modalConfig.formItems.find(
      (item) => item.field === 'password'
    )
    const newCallback = () => {
      if (passwordItem) {
        passwordItem.isHidden = false
      }
    }
    const editCallback = () => {
      if (passwordItem) {
        passwordItem.isHidden = true
      }
    }
    // 动态添加角色和部门
    const modalConfigRef = computed(() => {
      debugger
      const store = useStore()
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      // 出现never是因为类型推导失败，需要在原来的modalConfig上加上类型
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [defaultInfo, pageModalRef, handleNewClick, handleEditClick] =
      usePageModal(newCallback, editCallback)
    return {
      searchFormConfig,
      contentConfig,
      modalConfigRef,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      pageModalRef,
      handleEditClick,
      handleNewClick,
      defaultInfo
    }
  }
})
</script>

<style lang="less" scoped>
.handlerBtn {
  display: flex;
}
.edit {
  padding: 5px 0px;
}
</style>
