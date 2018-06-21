import Vue from 'vue'
import _ from '@/utils/util'
Vue.use(_)
Vue.config.productionTip = false
import { i18n, App, router, store } from '@/base'
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
