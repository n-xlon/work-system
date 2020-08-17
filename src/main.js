import Vue from 'vue'
import './config/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import 'amfe-flexible'
import ElementUI from 'element-ui'
import { RouteMap } from './config/index'
import { installToast } from './utils/toast'
import './router/router'
import Vconsole from 'vconsole'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$config = { RouteMap }

Vue.prototype.$_toast = window.$_toast = (options) => installToast(options)

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// const vConsole = new Vconsole()

window.vm = vm
