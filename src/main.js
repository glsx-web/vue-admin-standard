/*
 * @Author: limin
 * @Date: 2018-06-25 10:30:54
 * @Last Modified by: limin
 * @Last Modified time: 2018-06-28 20:14:48
 */
import Vue from 'vue'
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
