<template>
  <div class="nav-header">
    <el-icon :size="30">
      <component
        class="fold-menu"
        :is="iconName"
        @click="handleFoldClick"
      ></component>
    </el-icon>
    <div class="content">
      <Breadcrumb :breadcrumbs="breadcrumbs" />
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
            <span>{{ name }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleExitClick"
                >退出登陆</el-dropdown-item
              >
              <el-dropdown-item>用户信息</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
import Breadcrumb from '@/base-ui/breadcrumb/index'
import localCache from '@/utils/cache'
export default defineComponent({
  emits: ['foldChange'],
  components: { Breadcrumb },
  setup(prop, context) {
    const store = useStore()
    let iconName = ref('Fold')
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      if (isFold.value === false) {
        iconName.value = 'Fold'
      } else {
        iconName.value = 'Expand'
      }
      context.emit('foldChange', isFold.value)
    }
    const name = computed(() => {
      return store.state.login.userInfo.name
    })
    const route = useRoute()
    const breadcrumbs = computed(() => {
      const currentPath = route.path
      const userMenus = store.state.login.userMenus
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    const router = useRouter()
    const handleExitClick = () => {
      localCache.deleteCache('token')
      router.push('/main')
    }
    return { handleFoldClick, iconName, name, breadcrumbs, handleExitClick }
  }
})
</script>

<style lang="less" scoped>
.fold-menu {
  font-size: 28px;
  margin-top: 8px;
}
.nav-header {
  display: flex;
}
.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
