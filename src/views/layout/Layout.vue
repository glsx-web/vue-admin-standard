<template>
  <el-container>
    <el-aside class="aside" :class="objAsideClass" :style="objAsideStyle">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
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
    <el-header> 
      <navbar />
      <tags-view />
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
const EXCLUDE = 124

export default {
  name: 'layout',
  data() {
    return {
      logo: {
        height: 50,
        width: 180,
        backgroundColor: '#192227',
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
    sidebar() {
      return this.$store.state.app.sidebar
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
    objAsideClass() {
      console.log(this.sidebar.opened)
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    objAsideStyle() {
      return {
        width: ((this.device === 'mobile') ? 0 : (this.sidebar.opened ? 180 : 36)) + 'px'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  // .app-wrapper {
  //   @include clearfix;
  //   position: relative;
  //   height: 100%;
  //   width: 100%;
  // }
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

