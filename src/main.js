import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import VScrollLock from 'v-scroll-lock'

Vue.use(VueLazyload)
Vue.use(VScrollLock)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
