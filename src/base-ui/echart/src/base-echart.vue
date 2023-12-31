<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from 'vue'
import useEchart from '../hooks/useEchart'

export default defineComponent({
  props: {
    options: {
      type: Object,
      required: true
    },
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const echartDivRef = ref<HTMLElement>()
    onMounted(() => {
      const { setOptions } = useEchart(echartDivRef.value!)
      // 刷新页面之后没反应，加了一个watchEffect
      watchEffect(() => {
        setOptions(props.options)
      })
    })
    return { echartDivRef }
  }
})
</script>

<style lang="less" scoped></style>
