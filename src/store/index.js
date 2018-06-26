/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:36
 * @Last Modified by:   limin
 * @Last Modified time: 2018-06-25 10:29:36
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import tagsView from './modules/tagsView'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    tagsView,
    errorLog
  },
  getters
})

export default store
