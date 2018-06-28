/*
 * @Author: limin
 * @Date: 2018-06-25 10:30:45
 * @Last Modified by: limin
 * @Last Modified time: 2018-06-28 11:51:33
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
import EasyScroll from 'easyscroll'
// import Theme from '@/components/ThemePicker'
// Theme.theme = '#409EFF'

Vue.use(EasyScroll)

import _ from '@/prototypes'
Vue.use(_)

Vue.use(ElementUI, { locale })
export {
  i18n,
  App,
  router,
  store
}

