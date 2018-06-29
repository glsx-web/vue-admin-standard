<template>
    <!-- <el-scrollbar wrapClass="scrollbar-wrapper"> -->
    <div>
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
      <sidebar-item :routes="permission_routers" :generate="generate"></sidebar-item>
      </el-menu>
    </div>
  <!-- </el-scrollbar> -->
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  props: {
    permission_routers: {
      type: Array
    },
    isSidebarOpend: {
      type: Boolean
    },
    generate: {
      type: Function
    }
  },
  computed: {
    isCollapse() {
      return !this.isSidebarOpend
    }
  }
}
</script>
