import * as echarts from 'echarts'
import chinaMapData from '../data/china.json'
echarts.registerMap('china', chinaMapData)
export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }
  return { echartInstance, setOptions }
}
