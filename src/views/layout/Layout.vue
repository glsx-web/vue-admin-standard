<template>
  <el-container>
    <el-aside class="aside" :class="aside.class" :style="aside.style">
      <Logo 
        :width="aside.logo.width" 
        :height="aside.logo.height" 
        :backgroundColor="aside.logo.backgroundColor" 
        :backgroundImage="aside.logo.backgroundImage" />
        <gl-scroll  :height="aside.height" className="sidebar-container">
          <sidebar 
            :isSidebarOpend="aside.sidebar.opened" 
            :permission_routers="aside.sidebar.permission_routers" 
            :generate="aside.sidebar.generate"
            :colors="aside.sidebar.colors" />
        </gl-scroll>
        <i class="dragger" v-drag="greet"></i>
    </el-aside>
  <el-container>
    <el-header :style="header.style"> 
      <navbar 
        v-on:@themeHandler="handleTheme" 
        v-on:@logout="handleLogout"
        v-on:@toggleSideBar="handleToggle"
        v-on:@setLanguage="handleSetLanguage"
        :theme="header.navbar.theme" 
        :avatar="header.navbar.user.avatar" 
        :name="header.navbar.user.name"
        :language="header.navbar.language"
        :screenfull="header.navbar.screenfull"
        :logout="header.navbar.logout"
        :settings="header.navbar.settings"
        :generate="header.navbar.generate"
        :isActive="aside.sidebar.opened"/>
      <tags-view 
        v-on:@addViewTag="handleAddViewTag"
        v-on:@closeSeletedTag="handleCloseTag"
        v-on:@closeOthersTags="handleCloseOthersTags"
        v-on:@closeAllTags="handleCloseAllTags"
        :activeColor="header.tagsView.activeColor" 
        :generate="header.tagsView.generate" 
        :visitedViews="header.tagsView.visitedViews"/>
    </el-header>
    <el-main> 
      <gl-scroll :height="main.height">
          <app-main :cachedViews="main.cachedViews" />
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
import { mapGetters, mapActions } from 'vuex'

const EXCLUDE = 124

/**
 * Logo 高度
 */
const LOGO_HEIGHT = 100

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
    ...mapGetters([
      'sidebar',
      'device',
      'clientHeight',
      'avatar',
      'name',
      'language',
      'theme',
      'cachedViews',
      'visitedViews',
      'permission_routers'
    ]),

    themeColor() {
      return this.theme || getTheme || ORIGINAL_THEME
    },
    aside() {
      return {
        height: this.clientHeight - LOGO_HEIGHT,
        class: {
          hideSidebar: !this.isSidebarOpend,
          withoutAnimation: false, // this.sidebar.withoutAnimation,
          minsize: this.device === 'minsize'
        },
        style: {
          width: ((!this.isSidebarOpend && this.device === 'minsize') ? 0 : (this.isSidebarOpend ? this.SIDEBAR_WIDTH_MAX : SIDEBAR_WIDTH_MIN)) + 'px',
          backgroundColor: this.themeColor
        },
        logo: {
          // width: '',
          height: LOGO_HEIGHT,
          backgroundColor: '', // 默认transparent
          backgroundImage: '../../static/logo.png'
        },
        sidebar: {
          opened: this.isSidebarOpend,
          permission_routers: this.permission_routers,
          generate: generateTitle,
          colors: {
            textColor: '#fff',
            activeTextColor: '#ffd04b',
            backgroundColor: '#304156'
          }
        }
      }
    },
    header() {
      return {
        style: {
          backgroundColor: this.themeColor
        },
        navbar: {
          user: {
            avatar: {
              show: false,
              value: this.avatar
            },
            name: {
              show: true,
              value: this.name
            }
          },
          screenfull: {
            show: true,
            content: this.$t('navbar.screenfull')
          },
          logout: {
            show: true,
            content: this.$t('navbar.logOut')
          },
          language: {
            show: true,
            content: this.$t('navbar.language'),
            value: this.language
          },
          settings: {
            show: true,
            content: this.$t('navbar.settings'),
            value: this.sttings
          },
          theme: {
            show: true,
            content: this.$t('navbar.theme'),
            predefineColors: [
              '#409EFF',
              '#FF0000'
            ],
            value: this.themeColor
          },
          generate: generateTitle

        },
        tagsView: {
          activeColor: this.themeColor,
          visitedViews: this.visitedViews,
          generate: generateTitle
        }
      }
    },
    main() {
      return {
        height: this.clientHeight - EXCLUDE,
        cachedViews: this.cachedViews
      }
    },
    isSidebarOpend() {
      return this.sidebar.opened
    }
  },
  methods: {
    ...mapActions([
      'CloseSideBar',
      'SetTheme',
      'LogOut',
      'ToggleSideBar',
      'SetLanguage',
      'addVisitedViews',
      'delVisitedViews',
      'delOthersViews',
      'delAllViews'
    ]),
    handleClickOutside() {
      this.CloseSideBar()
    },
    handleTheme(theme) {
      this.SetTheme(theme)
    },
    handleLogout() {
      this.LogOut().then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    handleToggle() {
      this.ToggleSideBar()
    },
    handleSetLanguage(lang) {
      this.SetLanguage(lang).then(() => {
        this.$i18n.locale = lang
      })
    },
    handleAddViewTag(route) {
      this.addVisitedViews(route)
    },
    handleCloseTag(view, isActive) {
      this.delVisitedViews(view).then((views) => {
        if (isActive) {
          const latestView = views.slice(-1)[0]
          this.$router.push(latestView ? latestView.fullPath : '/')
        }
      })
    },
    handleCloseOthersTags(selectedTag) {
      this.delOthersViews(selectedTag).then(() => {
        this.$router.push(selectedTag.fullPath)
      })
    },
    handleCloseAllTags() {
      this.delAllViews().then(() => {
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

