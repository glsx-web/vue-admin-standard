/*
 * @Author: limin
 * @Date: 2018-06-25 10:30:45
 * @Last Modified by: limin
 * @Last Modified time: 2018-06-29 20:31:03
 */
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import '@/icons' // icon
import '@/guards' // navigation-guards
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import i18n from '@/lang' // Internationalization
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/directives'
import * as filters from './filters' // global filters

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
import _ from '@/prototypes'
Vue.use(_)

Vue.use(ElementUI, { locale })
export {
  i18n,
  App,
  router,
  store
}

