import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 新增组件
// https://vxetable.cn/v3/#/table/start/install
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
Vue.use(VXETable)
// http://v4.iviewui.com/docs/guide/install
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(ViewUI)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

// 给每个请求都拦截下来 添加请求的token信息
// axios.interceptors.request.use(function (config) {
//   config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
//   return config
// })

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
