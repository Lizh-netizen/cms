<template>
  <div class="login">
    <LoginPanel />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './cpns/LoginPanel.vue'
export default defineComponent({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  components: { LoginPanel },
  setup() {}
})
</script>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 150px;
}
</style>
