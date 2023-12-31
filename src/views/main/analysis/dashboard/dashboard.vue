<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7"
        ><hyCard title="分类商品数量（饼图）"
          ><pieEchart :pieData="pieData" /></hyCard
      ></el-col>
      <el-col :span="10"><hyCard title="不同城市商品销量"></hyCard></el-col>
      <el-col :span="7"
        ><hyCard title="分类商品数量（玫瑰图）">
          <roseEchart :roseData="pieData" /> </hyCard
      ></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12"
        ><hyCard title="分类商品的销量">
          <lineEchart
            :xlabels="categoryGoodsSale.xlabels"
            :values="categoryGoodsSale.values"
          /> </hyCard
      ></el-col>
      <el-col :span="12"
        ><hyCard title="分类商品的收藏">
          <mapEchart :mapData="addressGoodsSale" /> </hyCard
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from '@/store'
import hyCard from '@/base-ui/card.vue'

import { pieEchart } from '@/components/page-echarts'
import { roseEchart } from '@/components/page-echarts'
import { lineEchart } from '@/components/page-echarts'
import { mapEchart } from '@/components/page-echarts'
export default defineComponent({
  components: { hyCard, pieEchart, roseEchart, lineEchart, mapEchart },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')
    const pieData = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item) => {
        return { name: item.name, value: item.goodsCount }
      })
    })
    const categoryGoodsSale = computed(() => {
      const xlabels: string[] = []
      const values: any[] = []
      const categoryGoodsSale = store.state.dashboard.categoryGoodsSale
      for (const item of categoryGoodsSale) {
        xlabels.push(item.name)
        values.push(item.goodsCount)
      }
      return { xlabels, values }
    })
    const categoryGoodsFavor = computed(() => {
      const xlabels: string[] = []
      const values: any[] = []
      const categoryGoodsFavor = store.state.dashboard.categoryGoodsFavor
      for (const item of categoryGoodsFavor) {
        xlabels.push(item.name)
        values.push(item.GoodsFavor)
      }
      return { xlabels, values }
    })
    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })
    return { pieData, categoryGoodsSale, categoryGoodsFavor, addressGoodsSale }
  }
})
</script>

<style></style>
