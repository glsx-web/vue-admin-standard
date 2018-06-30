<template>
    <div :style="header.style"> 
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
        :isActive="isSidebarOpend"/>
      <tags-view 
        v-on:@addViewTag="handleAddViewTag"
        v-on:@closeSeletedTag="handleCloseTag"
        v-on:@closeOthersTags="handleCloseOthersTags"
        v-on:@closeAllTags="handleCloseAllTags"
        :activeColor="header.tagsView.activeColor" 
        :generate="header.tagsView.generate" 
        :visitedViews="header.tagsView.visitedViews"/>
    </div>
</template>

<script>
 import { mapGetters, mapActions } from 'vuex'
import { getTheme } from '@/utils/cache'
import { generateTitle } from '@/utils/i18n'
import Navbar from './Navbar'
import TagsView from './TagsView'
/**
 * 默认颜色
 */
const ORIGINAL_THEME = '#409EFF' // default color
export default {
   name: 'GLAppHeader',
   components: {
     Navbar,
     TagsView
   },
   computed: {
     ...mapGetters([
       'sidebar',
       'device',
       'clientHeight',
       'avatar',
       'name',
       'language',
       'theme',
       'visitedViews'
     ]),

     themeColor() {
       return this.theme || getTheme || ORIGINAL_THEME
     },
     isSidebarOpend() {
       return this.sidebar.opened
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
     }
   }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
