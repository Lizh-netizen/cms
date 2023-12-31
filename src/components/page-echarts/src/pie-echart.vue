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
  props: ['pieData'],
  setup(props) {
    const options = computed(() => {
      return {
        tooltip: {
          trigger: 'item'
        },
        // legend: {
        //   orient: 'horizontal'
        //   // left: 'left'
        // },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: props.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    })
    return { options }
  }
})
</script>

<style lang="less" scoped></style>
