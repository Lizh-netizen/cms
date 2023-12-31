<template>
  <div class="role">
    <pageSearch :searchFormConfig="searchFormConfig" />
    <pageContent
      :contentConfig="contentConfig"
      pageName="role"
      @handleEditClick="handleEditClick"
      @handleNewClick="handleNewClick"
    />
    <pageModal
      :modalConfig="modalConfig"
      pageName="role"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="el-tree">
        <el-tree
          ref="elTreeRef"
          :data="menuList"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </pageModal>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, ref } from 'vue'
import { contentConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'
import pageContent from '@/components/page-content/src/page-content.vue'
import pageSearch from '@/components/page-search/src/page-search.vue'
import pageModal from '@/components/page-modal/src/page-modal.vue'
import { getMenuLeafKeys } from '@/utils/map-menus'
import { ElTree } from 'element-plus'
export default defineComponent({
  components: { pageContent, pageSearch, pageModal },
  setup() {
    const otherInfo = ref({})
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    const [defaultInfo, pageModalRef, handleNewClick, handleEditClick] =
      usePageModal(undefined, editCallback)
    const store = useStore()
    const menuList = computed(() => {
      return store.state.entireMenu
    })
    return {
      contentConfig,
      searchFormConfig,
      modalConfig,
      defaultInfo,
      pageModalRef,
      handleNewClick,
      handleEditClick,
      menuList,
      handleCheckChange,
      elTreeRef,
      otherInfo
    }
  }
})
</script>

<style lang="less" scoped>
.el-tree {
  margin-left: 30px;
}
</style>
