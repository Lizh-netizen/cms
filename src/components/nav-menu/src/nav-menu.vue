<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.png" />
      <span v-if="!collapse" class="title">管理</span>
    </div>
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="collapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.name === '系统总览'"
                ><monitor></monitor
              ></el-icon>
              <el-icon v-else-if="item.name === '系统管理'"
                ><MilkTea
              /></el-icon>
              <el-icon v-else-if="item.name === '商品中心'"
                ><PartlyCloudy
              /></el-icon>
              <el-icon v-else-if="item.name === '随便聊聊'"><Pear /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id + ''">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleMenusItemClick(subitem)"
              >
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else-if="item.type === 2">
          <template v-for="item in userMenus" :key="item.id">
            <el-menu-item :index="item.id">
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'
import { pathMapToMenu } from '@/utils/map-menus'
export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path
    const store = useStore()
    const userMenus = computed(() => {
      return store.state.login.userMenus
    })
    const menu = pathMapToMenu(userMenus.value, currentPath)
    const defaultValue = ref(menu.id + '')
    const handleMenusItemClick = (item: any) => {
      router.push({
        path: item.url ?? '/not-found'
      })
    }
    return { userMenus, defaultValue, handleMenusItemClick }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }
}
.el-menu {
  border-right: none;
}
</style>
