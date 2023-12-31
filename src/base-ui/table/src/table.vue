<template>
  <div class="content">
    <div class="header">
      <slot name="header">{{ title }}</slot>
      <slot name="headerHandler"></slot>
    </div>
    <el-table
      :data="list"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        width="80px"
        align="center"
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.name">
        <el-table-column
          v-bind="propItem"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <template v-if="showFooter">
          <el-pagination
            v-model:currentPage="page.currentPage"
            v-model:page-size="page.pageSize"
            :page-sizes="[5, 10, 30]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </template>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    propList: {
      type: Array,
      default: () => []
    },
    list: {
      type: Array,
      default: () => []
    },
    listCount: {
      type: Number,
      required: true
    },
    showIndex: {
      type: Boolean,
      required: true
    },
    showSelectColumn: {
      type: Boolean,
      required: true
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      dafault: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emits: ['selectionChange', 'update:page'],
  setup(props, { emit }) {
    // 1. 选中前面的checkbox,value默认是这一行的数据，而且是proxy，如果多选的话就是proxy的数组
    // selectionChange是el-table的默认事件
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value)
    }
    // 2. 改变当前页和每页多少条数据的逻辑
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

<style lang="less" scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
.header {
  display: flex;
  justify-content: space-between;
}
.headerHandler {
  flex: 1;
}
</style>
