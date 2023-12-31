<template>
  <el-dialog
    v-model="dialogVisible"
    title="Warning"
    width="30%"
    center
    destroy-on-close
  >
    <hyForm v-bind="modalConfig" v-model="formData" />
    <slot></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleConfirmClick"
          >Confirm</el-button
        >
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import hyForm from '@/base-ui/form/src/form.vue'
import { useStore } from '@/store'
export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    // 加了一个otherInfo的目的是为了加上去除了formData额外的内容，还不能是写固定的，要是由外面页面传进来的才可以
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: { hyForm },
  setup(props) {
    const store = useStore()
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    const handleConfirmClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // edit
        store.dispatch('system/editdataAction', {
          pageName: props.pageName,
          editdata: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // new
        store.dispatch('system/createNewdataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return { dialogVisible, formData, handleConfirmClick }
  }
})
</script>

<style lang="less" scoped></style>
