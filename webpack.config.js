import AutoImport from 'unplugin-auto-import/webpack'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import Components from 'unplugin-vue-components/webpack'
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export const plugins = [
  AutoImport({
    resolvers: [ElementPlusResolver()]
  }),
  Components({
    resolvers: [ElementPlusResolver()]
  })
]
