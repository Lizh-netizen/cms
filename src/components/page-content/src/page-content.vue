<template>
  <Table
    v-bind="contentConfig"
    :list="dataList"
    :listCount="listCount"
    @selectionChange="selectionChange"
    v-model:page="pageInfo"
  >
    <!-- header中的插槽 -->
    <template #headerHandler
      ><el-button
        type="primary"
        size="small"
        v-if="isCreate"
        @click="handleNewClick"
        >新建用户</el-button
      >
    </template>
    <!-- 列中的插槽 -->
    <template #status="scope">
      <el-button
        plain
        size="small"
        :type="scope.row.enable ? 'success' : 'danger'"
        >{{ scope.row.enable ? '启用' : '禁用' }}
      </el-button></template
    >
    <template #createAt="scope">
      {{ $filters.formatTime(scope.row.createAt) }}
    </template>
    <template #updateAt="scope">
      {{ $filters.formatTime(scope.row.updateAt) }}
    </template>
    <template #handler="scope">
      <div class="handlerBtn">
        <el-button
          size="small"
          class="edit"
          v-if="isUpdate"
          plain
          @click="handleEditClick(scope.row)"
          ><el-icon :size="20"> <Edit /> </el-icon>编辑</el-button
        >
        <el-button
          size="small"
          class="delete"
          v-if="isDelete"
          plain
          @click="handleDeleteData(scope.row)"
          ><el-icon> <Delete /> </el-icon>删除</el-button
        >
      </div>
    </template>
    <template
      v-for="item in otherPropSlots"
      :key="item.prop"
      #[item.slotName]="scope"
      ><template v-if="item.slotName">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </template>
  </Table>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import Table from '@/base-ui/table/index'
import { useStore } from '@/store'
import { usePermissions } from '@/hooks/usePermissions'
export default defineComponent({
  emits: ['handleEditClick', 'handleNewClick'],
  components: { Table },
  props: {
    contentConfig: {
      type: Object,
      default: () => {}
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const selectionChange = (value: any) => {
      console.log(value)
    }
    // 0 (增删改查)删除数据, 不用往主页里传了。在这里处理就可以，而且ID小于一定值是不允许删除的
    const handleDeleteData = (item: any) => {
      store.dispatch('system/deleteDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    const handleEditClick = (item: any) => {
      emit('handleEditClick', item)
    }
    const handleNewClick = () => {
      emit('handleNewClick')
    }
    // 1 双向绑定分页器中的pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())
    // 2 发送请求
    const store = useStore()
    const isCreate = usePermissions(props.pageName, 'create')
    const isUpdate = usePermissions(props.pageName, 'update')
    const isDelete = usePermissions(props.pageName, 'delete')
    const isQuery = usePermissions(props.pageName, 'query')
    // 调用这个方法时，它需要页面名称和一次请求多少数据（这个是接口的要求）默认当前页是第一页
    const getPageData = (queryInfo: any = {}) => {
      if (isQuery) {
        store.dispatch('system/getPageListAction', {
          pageName: props.pageName,
          queryInfo: {
            offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
            size: pageInfo.value.pageSize,
            // 接口文档里没写到这一点
            ...queryInfo
          }
        })
      }
    }
    getPageData()
    // 3 获取数据,要做到可以复用，就是根据不同的pageName取到不同的list，内部的getters要写成方法，返回函数
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const listCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )
    // 4获取其他动态插槽名称
    const otherPropSlots = props.contentConfig.propList.filter((item: any) => {
      if (item.slotName === 'status') return false
      if (item.slotName === 'createAt') return false
      if (item.slotName === 'updateAt') return false
      if (item.slotName === 'handler') return false
      return true
    })
    return {
      selectionChange,
      dataList,
      getPageData,
      listCount,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteData,
      handleEditClick,
      handleNewClick
    }
  }
})
</script>

<style lang="less" scoped>
.edit {
  padding: 5px;
}
.delete {
  margin: 0px;
}
</style>
