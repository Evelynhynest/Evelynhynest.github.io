import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useLoginStore } from '@/stores/login/login'

import 'normalize.css'
import 'element-plus/theme-chalk/base.css'
import '@/assets/css/index.less'

// import ynRequest from '@/service'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(createPinia())

const loginStore = useLoginStore()
// 使仓库数据与本地数据同步，根据获取的数据注册动态路由
loginStore.setLoginStore()
// 匹配路由，必须在注册动态路由之后
app.use(router)

app.mount('#app')

// console.log(import.meta.env.MODE)

/* ynRequest
  .post({
    url: '/words?type=json',
    showLoading: true
  })
  .then((res) => {
    console.log(res)
  }) */
