/*
 * @Author: limin
 * @Date: 2018-07-01 01:36:03
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-01 16:47:27
 */

import { mapGetters } from 'vuex'
import { getTheme } from '@/utils/cache'
import { generateTitle } from '@/utils/i18n'
import confMixin from '@/views/layout/config'
export default {
  mixins: [confMixin],
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
      return this.theme || getTheme || this.theme_color
    },
    isSidebarOpend() {
      return this.sidebar.opened
    }
  },
  methods: {
    generateTitle
  }
}
