<template>
  <div class="goods">
    <pageContent :contentConfig="contentConfig" pageName="goods">
      <template #image="scope"
        ><el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          fit="cover"
          preview-teleported="true"
      /></template>
    </pageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { contentConfig } from './config/content.config'
import pageContent from '@/components/page-content/src/page-content.vue'
export default defineComponent({
  components: { pageContent },
  setup() {
    return { contentConfig }
  }
})
</script>

<style></style>
