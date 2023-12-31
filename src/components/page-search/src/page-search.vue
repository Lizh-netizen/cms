<template>
  <div class="search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header><h2 class="header">高级检索</h2></template>
      <template #footer>
        <div class="additionBtn">
          <el-button @click="handleResetClick"
            ><el-icon><Refresh /></el-icon>重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick">检索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import hyForm from '@/base-ui/form/index'
export default defineComponent({
  props: ['searchFormConfig'],
  components: { hyForm },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 优化1: formdata中的属性动态决定
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    // 优化2：当用户点击重置
    const handleResetClick = () => {
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    // 当点击检索的时候，传出去的值是整个formData
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return { formData, handleResetClick, handleQueryClick }
  }
})
</script>

<style lang="less" scoped>
.hy-form {
  padding-top: 22px;
}
.header {
  text-align: center;
}
.additionBtn {
  text-align: right;
  padding: 20px;
}
</style>
