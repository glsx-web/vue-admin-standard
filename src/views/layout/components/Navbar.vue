<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="handleToggle" :isActive="sidebarStatus"></hamburger>
    <div class="right-menu">
      <NavUser :name="name" :avatar="avatar" class="right-menu-item"/>
      <!-- <error-log class="errLog-container right-menu-item"></error-log> -->
      <el-tooltip effect="dark" :content="$t('navbar.screenfull')" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>
       <el-tooltip effect="dark" :content="$t('navbar.theme')" placement="bottom" v-if="theme.show">
        <theme-picker v-on:themeHandler="handleTheme" :theme="theme.value" :predefineColors="theme.predefineColors" class="theme-switch right-menu-item"></theme-picker>
      </el-tooltip> 
      <logout @click.native="handleLogout" class="right-menu-item" />
      <!-- <lang-select class="international right-menu-item"></lang-select> -->
     
      <!-- <span @click="handleLockScreen"><svg-icon icon-class="lock" class-name="lock" /></span> -->
    </div>
  </el-menu>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import NavUser from '@/components/NavUser'
import Logout from '@/components/Logout'
// import glLock from '@/components/lock'

export default {
  props: {
    theme: Object,
    sidebarStatus: Boolean,
    avatar: Object,
    name: Object
  },
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    ThemePicker,
    NavUser,
    Logout
    // glLock
  },
  methods: {
    handleToggle() {
      this.$emit('toggleSideBar')
    },
    handleLogout() {
      this.$emit('logout')
    },
    handleTheme(theme) {
      this.$emit('themeHandler', theme)
    }
    // handleLockScreen() { // 锁屏
    //   // this.$store.commit('LOCK')
    //   console.log(111)
    //   this.$router.replace('/lockscreen')
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background-color: transparent;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
    .right-menu {
    float: right;
    height: 100%;
    margin-right: 10px;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
      vertical-align: -15px;
    }
    .international{
      vertical-align: top;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
<style rel="stylesheet/scss" lang="scss">
  .right-menu {
      .el-color-picker__trigger{
        // width: 30px !important;
        // height: 30px !important;
        background-color:#f2f2f2;
      }
      .el-color-picker{
        width:20px !important;
      }
    }
</style>

