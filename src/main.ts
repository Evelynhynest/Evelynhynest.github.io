import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useLoginStore } from '@/stores/login/login'

import 'normalize.css'
import 'element-plus/theme-chalk/base.css'
import 'element-plus/dist/index.css'
import '@/assets/css/index.less'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

import { globalRegister } from './global'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus, {
  locale: zhCn
})

app.use(globalRegister)

app.use(createPinia())

// 注意异步任务引发的顺序问题
if (import.meta.env.MODE === 'development') {
  ;(async () => {
    const { mocker } = await import('@/mocks/handlers')
    mocker.start({
      onUnhandledRequest: 'bypass'
    })
    const loginStore = useLoginStore()
    // 使仓库数据与本地数据同步，根据获取的数据注册动态路由
    loginStore.setupStore()
    // 匹配路由，必须在注册动态路由之后
    app.use(router)
    // app.use(router)必须在amount之前，否则无法注册router-view等内置组件
    app.mount('#app')
  })()
} else if (import.meta.env.MODE === 'production') {
  const loginStore = useLoginStore()
  // 使仓库数据与本地数据同步，根据获取的数据注册动态路由
  loginStore.setupStore()
  // 匹配路由，必须在注册动态路由之后
  app.use(router)
  // app.use(router)必须在amount之前
  app.mount('#app')
}
