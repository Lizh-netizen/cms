<template>
  <div class="main">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '210px'"
        ><NavMenu :collapse="isCollapse"
      /></el-aside>
      <el-container>
        <el-header><NavHeader @foldChange="foldChange" /></el-header>
        <el-main>
          <div class="page-info">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu/src/nav-menu.vue'
import NavHeader from '@/components/nav-header/src/nav-header.vue'
export default defineComponent({
  components: { NavMenu, NavHeader },
  setup() {
    const isCollapse = ref(false)
    const foldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }
    return { isCollapse, foldChange }
  }
})
</script>

<style lang="less" scoped>
.main {
  height: 100%;
}
.el-container {
  height: 100%;
}
.page-info {
  background-color: white;
  border-radius: 5px;
}
.el-main {
  background-color: whitesmoke;
}
</style>
