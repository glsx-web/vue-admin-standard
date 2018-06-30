/*
 * @Author: limin
 * @Date: 2018-07-01 01:36:03
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-01 04:59:54
 */

import { mapGetters } from 'vuex'
import { getTheme } from '@/utils/cache'
import { generateTitle } from '@/utils/i18n'
/**
 * 默认颜色
 */
const ORIGINAL_THEME = '#409EFF' // default color
export default {

  data() {
    return {
      SIDEBAR_WIDTH_MAX: 200,
      SIDEBAR_WIDTH_MIN: 36,
      LOGO_HEIGHT: 100
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'avatar',
      'name',
      'theme',
      'permission_routers',
      'clientHeight'
    ]),
    themeColor() {
      return this.theme || getTheme || ORIGINAL_THEME
    },
    isSidebarOpend() {
      return this.sidebar.opened
    },
    aside() {
      return {
        class: {
          hideSidebar: !this.isSidebarOpend,
          withoutAnimation: false, // this.sidebar.withoutAnimation,
          minsize: this.device === 'minsize'
        },
        style: {
          width: ((!this.isSidebarOpend && this.device === 'minsize') ? 0 : (this.isSidebarOpend ? this.SIDEBAR_WIDTH_MAX : this.SIDEBAR_WIDTH_MIN)) + 'px',
          backgroundColor: this.themeColor
        }
      }
    }
  },
  methods: {
    generateTitle
  }
}
