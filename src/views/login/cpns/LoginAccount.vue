<template>
  <div class="loginAccount">
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { ElForm } from 'element-plus'
import { useStore } from 'vuex'
import localCache from '../../../utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      // 表单是否能通过验证，有数据或者没数据
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 因为是异步操作所以就在store中的action处理了
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }
    const rules = {
      name: [
        {
          required: true,
          message: '用户名是必传内容',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名必须是5-10个字母或者数字',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码是必传内容',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名必须是5-10个字母或者数字',
          trigger: 'blur'
        }
      ]
    }
    return { account, rules, loginAction, formRef }
  }
})
</script>

<style lang="less" scoped></style>
