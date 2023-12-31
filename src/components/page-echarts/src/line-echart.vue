<template>
  <div class="pie-chart">
    <BaseEchart :options="options" width="400px" height="300px" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import BaseEchart from '@/base-ui/echart/src/base-echart.vue'
export default defineComponent({
  components: { BaseEchart },
  props: ['xlabels', 'values'],
  setup(props) {
    const options = computed(() => {
      return {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: props.xlabels
        },
        yAxis: {
          type: 'value'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            data: props.values,
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    })
    return { options }
  }
})
</script>

<style lang="less" scoped></style>
