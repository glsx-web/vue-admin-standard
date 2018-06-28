<template>
  <el-container>
    <el-aside class="aside" :class="objAsideClass" :style="objAsideStyle">
      <div v-if="device==='mobile' && isSidebarOpend" class="drawer-bg" @click="handleClickOutside"></div>
      <Logo :width="logo.width" :height="logo.height" :backgroundColor="logo.backgroundColor" :backgroundImage="logo.backgroundImage"></Logo>
      <!-- <el-scrollbar class="sidebar-container" wrapClass="scrollbar-wrapper" :style="{ 'height': asideHeight + 'px'}"> -->
        <EasyScrollbar class="sidebar-container">
          <div :style="{ 'height': asideHeight + 'px'}">
            <sidebar />
          </div>
        </EasyScrollbar>
      <!-- </el-scrollbar> -->
    </el-aside>
  <el-container>
    <el-header :style="objHeaderStyle"> 
      <navbar 
        v-on:themeHandler="handleTheme" 
        v-on:logout="handleLogout"
        v-on:toggleSideBar="handleToggle"
        :theme="theme" 
        :avatar="avatar" 
        :name="name" 
        :sidebarStatus="isSidebarOpend"/>
      <tags-view :activeColor="theme.value" />
    </el-header>
    <el-main> 
      <EasyScrollbar >
        <div :style="{ 'height': mainHeight + 'px'}">
          <app-main  />
        </div>
      </EasyScrollbar>
    </el-main>
    <el-footer>
      <GLFooter />
    </el-footer>
  </el-container>
</el-container>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView, GLFooter } from './components'
import Logo from '@/components/Logo'
import ResizeMixin from './mixin/ResizeHandler'
import { getTheme } from '@/utils/persist'
const EXCLUDE = 124
// const ORIGINAL_THEME = '#409EFF' // default color

export default {
  name: 'layout',
  data() {
    return {
      logo: {
        height: 50,
        width: 180,
        backgroundColor: '', // 默认transparent
        backgroundImage: '../../static/logo.png'
      }
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    GLFooter,
    Logo
  },
  mixins: [ResizeMixin],
  computed: {
    getters() {
      return this.$store.getters
    },
    isSidebarOpend() {
      return this.$store.state.app.sidebar.opened
    },
    device() {
      return this.$store.state.app.device
    },
    mainHeight() {
      return this.$store.state.app.clientHeight - EXCLUDE
    },
    asideHeight() {
      return this.$store.state.app.clientHeight - this.logo.height
    },
    avatar() {
      return {
        show: true,
        value: this.$store.state.user.avatar
      }
    },
    name() {
      return {
        show: true,
        value: this.$store.state.user.name
      }
    },
    theme() {
      return {
        show: true,
        predefineColors: [
          '#000000',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FFFF00',
          '#00FFFF',
          '#FF00FF',
          '#990033',
          '#CC9933',
          '#660033'
        ],
        value: this.$store.state.app.theme || getTheme
      }
    },
    objAsideClass() {
      return {
        hideSidebar: !this.isSidebarOpend,
        withoutAnimation: false, // this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    objAsideStyle() {
      return {
        width: ((!this.isSidebarOpend && this.device === 'mobile') ? 0 : (this.isSidebarOpend ? 180 : 36)) + 'px',
        backgroundColor: this.theme.value
      }
    },
    objHeaderStyle() {
      return {
        backgroundColor: this.theme.value
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    },
    handleTheme(theme) {
      this.$store.dispatch('SetTheme', theme)
    },
    handleLogout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleToggle() {
      this.$store.dispatch('ToggleSideBar')
    }
  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .aside{
      position:relative;
      overflow:hidden;
    }
    .el-header{
      height: auto !important;
      padding: 0 1px;
    }
    .el-main{
      padding: 0 !important;
    }
    .drawer-bg {
      background: #000;
      opacity: 0.3;
      width: 100%;
      top: 0;
      height: 100%;
      position: absolute;
      z-index: 999;
  }
</style>

