<template>
  <div class="menu">
    <pageContent :contentConfig="contentConfig" pageName="menu" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pageContent from '@/components/page-content/src/page-content.vue'
import { contentConfig } from './config/content.config'
export default defineComponent({
  components: { pageContent },
  setup() {
    return { contentConfig }
  }
})
</script>

<style></style>
