<template>
  <el-container>
    <el-aside class="aside" :class="objAsideClass" :style="objAsideStyle">
      <Logo 
        :width="logo.width" 
        :height="logo.height" 
        :backgroundColor="logo.backgroundColor" 
        :backgroundImage="logo.backgroundImage" />
        <gl-scroll  :height="asideHeight" className="sidebar-container">
          <sidebar 
            :isSidebarOpend="isSidebarOpend" 
            :permission_routers="getters.permission_routers" 
            :generate="generateTitle" />
        </gl-scroll>
        <i class="dragger" v-drag="greet" id="dragger"></i>
    </el-aside>
  <el-container>
    <el-header :style="objHeaderStyle"> 
      <navbar 
        v-on:@themeHandler="handleTheme" 
        v-on:@logout="handleLogout"
        v-on:@toggleSideBar="handleToggle"
        v-on:@setLanguage="handleSetLanguage"
        :theme="theme" 
        :avatar="avatar" 
        :name="name"
        :language="language"
        :screenfull="screenfull"
        :logout="logout"
        :generate="generateTitle"
        :sidebarStatus="isSidebarOpend"/>
      <tags-view 
        v-on:@addViewTag="handleAddViewTag"
        v-on:@closeSeletedTag="handleCloseTag"
        v-on:@closeOthersTags="handleCloseOthersTags"
        v-on:@closeAllTags="handleCloseAllTags"
        :activeColor="theme.value" 
        :generate="generateTitle" 
        :visitedViews="visitedViews"/>
    </el-header>
    <el-main> 
      <gl-scroll :height="mainHeight">
          <app-main :cachedViews="cachedViews" />
      </gl-scroll>
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
import { getTheme } from '@/utils/cache'
import { generateTitle } from '@/utils/i18n'
import glScroll from '@/components/GL-Scroll'
const EXCLUDE = 124

/**
 * Logo 高度
 */
const LOGO_HEIGHT = 150

/**
 * 导航栏最小宽度
 */
const SIDEBAR_WIDTH_MIN = 36
/**
 * 默认颜色
 */
const ORIGINAL_THEME = '#409EFF' // default color

export default {
  name: 'layout',
  data() {
    return {
      logo: {
        height: LOGO_HEIGHT,
        backgroundColor: '', // 默认transparent
        backgroundImage: '../../static/logo.png'
      },
      SIDEBAR_WIDTH_MAX: 200
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    GLFooter,
    Logo,
    glScroll
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
        show: false,
        value: this.$store.state.user.avatar
      }
    },
    name() {
      return {
        show: true,
        value: this.$store.state.user.name
      }
    },
    screenfull() {
      return {
        show: true,
        content: this.$t('navbar.screenfull')
      }
    },
    logout() {
      return {
        show: true,
        content: this.$t('navbar.logOut')
      }
    },
    language() {
      return {
        show: true,
        content: this.$t('navbar.language'),
        value: this.$store.getters.language
      }
    },
    theme() {
      return {
        show: true,
        content: this.$t('navbar.theme'),
        predefineColors: [
          '#409EFF',
          '#FF0000',
          '#00FF00',
          '#0000FF',
          '#FFFF00',
          '#00FFFF',
          '#FF00FF',
          '#990033',
          '#CC9933',
          '#660033',
          '#000000',
          '#b7704f',
          '#53261f',
          '#54211d',
          '#444693',
          '#46485f',
          '#181d4b',
          '#1a2933',
          '#121a2a',
          '#0c212b',
          '#005344',
          '#122e29',
          '#008792',
          '#145b7d',
          '#11264f',
          '#1b315e',
          '#1d1626',
          '#3c3645',
          '#4f5555',
          '#74787c'
        ],
        value: this.$store.state.app.theme || getTheme || ORIGINAL_THEME
      }
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    objAsideClass() {
      return {
        hideSidebar: !this.isSidebarOpend,
        withoutAnimation: false, // this.sidebar.withoutAnimation,
        minsize: this.device === 'minsize'
      }
    },
    objAsideStyle() {
      return {
        width: ((!this.isSidebarOpend && this.device === 'minsize') ? 0 : (this.isSidebarOpend ? this.SIDEBAR_WIDTH_MAX : SIDEBAR_WIDTH_MIN)) + 'px',
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
    },
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('SetLanguage', lang)
    },
    handleAddViewTag(route) {
      this.$store.dispatch('addVisitedViews', route)
    },
    handleCloseTag(view, isActive) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (isActive) {
          const latestView = views.slice(-1)[0]
          this.$router.push(latestView ? latestView.fullPath : '/')
        }
      })
    },
    handleCloseOthersTags(selectedTag) {
      this.$router.push(selectedTag.fullPath)
      this.$store.dispatch('delOthersViews', selectedTag)
    },
    handleCloseAllTags() {
      this.$store.dispatch('delAllViews').then(() => {
        this.$router.push('/')
      })
    },
    greet(obj) {
      if (obj.left < 36) {
        obj.left = 36
        this.handleClickOutside()
      }
      obj.left = Math.min(obj.left, 300)
      this.SIDEBAR_WIDTH_MAX = obj.left
    },
    generateTitle
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
    .dragger{
      height: 100%;
      width: 10px;
      position: absolute;
      right: 0;
      cursor: w-resize;
      z-index: 9999;
    }
</style>

