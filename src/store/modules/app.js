/*
 * @Author: limin
 * @Date: 2018-06-25 10:29:04
 * @Last Modified by: limin
 * @Last Modified time: 2018-06-25 18:35:39
 */
import { getSidebarStatus, setSidebarClose, setSidebarOpen } from '@/utils/persist'

const app = {
  state: {
    sidebar: {
      opened: !!getSidebarStatus,
      withoutAnimation: false
    },
    device: 'desktop',
    clientHeight: document.body.clientHeight
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        setSidebarClose()
      } else {
        setSidebarOpen()
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      setSidebarClose()
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_CLIENT_HEIGHT: (state, clientHeight) => {
      state.clientHeight = clientHeight
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    CloseSideBar({ commit }, { withoutAnimation }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    SetClientHeight({ commit }, clientHeight) {
      commit('SET_CLIENT_HEIGHT', clientHeight)
    }
  }
}

export default app
