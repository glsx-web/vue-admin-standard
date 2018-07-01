/*
 * @Author: limin
 * @Date: 2018-07-01 01:36:03
 * @Last Modified by: limin
 * @Last Modified time: 2018-07-01 17:56:30
 */
<template>
  <div  class="aside" :class="oClass" :style="oStyle" v-if="Aside.show">
      <gl-logo v-if="Logo.show"
        :width="oLogo.width" 
        :height="oLogo.height" 
        :backgroundColor="oLogo.backgroundColor" 
        :backgroundImage="oLogo.backgroundImage" />
        <gl-scroll  :height="nHeight" className="sidebar-container" v-if="Sidebar.show">
          <gl-sidebar 
            :isSidebarOpend="oSidebar.opened" 
            :permission_routers="oSidebar.permission_routers" 
            :generate="oSidebar.generate"
            :colors="oSidebar.colors" />
        </gl-scroll>
        <i class="dragger" v-drag="greet"></i>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import GlSidebar from './Sidebar'
import GlLogo from '@/components/Logo'
import GlScroll from '@/components/GL-Scroll'
import pubMixin from '../mixins/public'

export default {
  name: 'GLAppAside',
  mixins: [pubMixin],
  components: {
    GlSidebar,
    GlLogo,
    GlScroll
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'avatar',
      'name',
      'permission_routers',
      'clientHeight'
    ]),
    Sidebar() {
      return this.Aside.Sidebar
    },
    Logo() {
      return this.Aside.Logo
    },
    oSidebar() {
      return {
        opened: this.isSidebarOpend,
        permission_routers: this.permission_routers,
        generate: this.generateTitle,
        colors: {
          textColor: this.Sidebar.text_color,
          activeTextColor: this.Sidebar.active_text_color,
          backgroundColor: this.Sidebar.background_color
        }
      }
    },
    nHeight() {
      return this.clientHeight - this.Logo.height
    },
    oClass() {
      return {
        hideSidebar: !this.isSidebarOpend,
        withoutAnimation: false, // this.sidebar.withoutAnimation,
        minsize: this.device === 'minsize'
      }
    },
    oStyle() {
      return {
        width: ((!this.isSidebarOpend && this.device === 'minsize') ? 0 : (this.isSidebarOpend ? this.Sidebar.width_max : this.Sidebar.width_min)) + 'px',
        backgroundColor: this.themeColor,
        height: '100%'
      }
    },
    oLogo() {
      return {
        // width: '',
        height: this.Logo.height,
        backgroundColor: this.Logo.backgroundColor,
        backgroundImage: this.Logo.image
      }
    }
  },
  methods: {
    greet(obj) {
      if (obj.left < 36) {
        obj.left = 36
        this.handleClickOutside()
      }
      obj.left = Math.min(obj.left, 300)
      this.Sidebar.width_max = obj.left
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .aside{
      position:relative;
      overflow:hidden;
    }
    .dragger{
      height: 100%;
      width: 10px;
      position: absolute;
      right: 0;
      cursor: w-resize;
      z-index: 9999;
    }
</style>