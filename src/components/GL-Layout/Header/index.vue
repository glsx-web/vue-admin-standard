<template>
    <div :style="oStyle"> 
      <navbar 
        v-on:@themeHandler="handleTheme" 
        v-on:@logout="handleLogout"
        v-on:@toggleSideBar="handleToggle"
        v-on:@setLanguage="handleSetLanguage"
        :theme="oNavbar.theme" 
        :avatar="oNavbar.user.avatar" 
        :name="oNavbar.user.name"
        :language="oNavbar.language"
        :screenfull="oNavbar.screenfull"
        :logout="oNavbar.logout"
        :settings="oNavbar.settings"
        :generate="oNavbar.generate"
        :isActive="isSidebarOpend"/>
      <tags-view 
        v-on:@addViewTag="handleAddViewTag"
        v-on:@closeSeletedTag="handleCloseTag"
        v-on:@closeOthersTags="handleCloseOthersTags"
        v-on:@closeAllTags="handleCloseAllTags"
        :activeColor="oTagsView.activeColor" 
        :generate="oTagsView.generate" 
        :visitedViews="oTagsView.visitedViews"/>
    </div>
</template>

<script>
 import { mapGetters, mapActions } from 'vuex'
import pub from '../mixins/public'
import Navbar from './Navbar'
import TagsView from './TagsView'
export default {
   name: 'GLAppHeader',
   mixins: [pub],
   components: {
     Navbar,
     TagsView
   },
   computed: {
     ...mapGetters([
       'avatar',
       'name',
       'language',
       'visitedViews'
     ]),
     oStyle() {
       return {
         backgroundColor: this.themeColor
       }
     },
     oNavbar() {
       return {
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
         generate: this.generateTitle
       }
     },
     oTagsView() {
       return {
         activeColor: this.themeColor,
         visitedViews: this.visitedViews,
         generate: this.generateTitle
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
