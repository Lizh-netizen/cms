import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'normalize.css'
import '../src/assets/css/index.less'
import { formatUtcString } from '@/utils/time-format'
import { setupStore } from '@/store'
import ElementPlus from '../node_modules/element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import HYRequest from './service/request'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.config.globalProperties.$filters = {
  formatTime(value: string) {
    return formatUtcString(value)
  }
}
const request = new HYRequest({ baseURL: 'http://123.207.32.32:8000/' })
console.log(
  request.request({
    url: '/home/multidata',
    method: 'GET'
  })
)
app.use(ElementPlus, {
  locale: zhCn
})
setupStore()
app.use(ElementPlus)
app
  .use(router as any)
  .use(store as any)
  .mount('#app')
