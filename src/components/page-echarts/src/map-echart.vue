<template>
  <div class="pie-chart">
    <BaseEchart :options="options" width="400px" height="300px" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import BaseEchart from '@/base-ui/echart/src/base-echart.vue'
import { convertData } from '../utils/convert-data'
export default defineComponent({
  components: { BaseEchart },
  props: ['xlabels', 'values', 'mapData'],
  setup(props) {
    const options = computed(() => {
      return {
        backgroundColor: '#404a59',
        tooltip: {
          trigger: 'item',
          formatter: function (params: any) {
            return params.name + ' : ' + params.value[2]
          }
        },
        legend: {
          orient: 'vertical',
          y: 'bottom',
          x: 'right',
          data: ['pm2.5'],
          textStyle: {
            color: '#fff'
          }
        },
        visualMap: {
          min: 0,
          max: 200,
          calculable: true,
          inRange: {
            color: ['#50a3ba', '#eac736', '#d94e5d']
          },
          textStyle: {
            color: '#fff'
          }
        },
        geo: {
          map: 'china',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        series: [
          {
            name: 'pm2.5',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(props.mapData),
            symbolSize: 12,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                borderColor: '#fff',
                borderWidth: 1
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
