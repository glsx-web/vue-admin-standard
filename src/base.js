import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import '@/icons' // icon
import '@/permission' // permission control
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import i18n from '@/lang' // Internationalization
import App from '@/App'
import router from '@/router'
import store from '@/store'
import EasyScroll from 'easyscroll'
Vue.use(EasyScroll)

Vue.use(ElementUI, { locale })
export {
  i18n,
  App,
  router,
  store
}

