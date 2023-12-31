<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登陆</span>
          </span>
        </template>
        <LoginAccount ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>密码登陆</span>
          </span>
        </template>
        <LoginPhone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="control-password">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" @click="handleLoginClick" class="login-btn"
      >立即登陆</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'
export default defineComponent({
  components: { LoginAccount, LoginPhone },
  setup() {
    // 1定义属性
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')
    // 定义方法
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        // 获取account组件，并执行其方法
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('手机登陆')
      }
    }
    return {
      isKeepPassword,
      handleLoginClick,
      accountRef,
      currentTab,
      phoneRef
    }
  }
})
</script>

<style lang="less" scoped>
.login-panel {
  width: 320px;
}
.title {
  text-align: center;
}
.control-password {
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 320px;
  margin-top: 10px;
}
</style>
