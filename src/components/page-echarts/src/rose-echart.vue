<template>
  <div class="pie-chart">
    <BaseEchart :options="options" width="250px" height="300px" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import BaseEchart from '@/base-ui/echart/src/base-echart.vue'
export default defineComponent({
  components: { BaseEchart },
  props: ['roseData'],
  setup(props) {
    const options = computed(() => {
      return {
        // legend: {
        //   top: 'bottom'
        // },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [20, 100],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: props.roseData
          }
        ]
      }
    })
    return { options }
  }
})
</script>

<style lang="less" scoped></style>
