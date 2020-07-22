import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import 'amfe-flexible'
import ElementUI from 'element-ui'
import { RouteMap } from './config/index'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$config = { RouteMap }

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.vm = vm
