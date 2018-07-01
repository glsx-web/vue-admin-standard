<template>
    <div>
      <el-menu
        mode="vertical"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        :text-color="oColors.textColor"
        :background-color="oColors.backgroundColor"
        :active-text-color="oColors.activeTextColor"
      >
      <sidebar-item :routes="permission_routers" :generate="generate"></sidebar-item>
      </el-menu>
    </div>
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
    },
    colors: {
      type: Object
    }
  },
  data() {
    return {
      color: {
        textColor: '#fff',
        activeTextColor: '#ffd04b',
        backgroundColor: '#304156'
      }
    }
  },
  computed: {
    isCollapse() {
      return !this.isSidebarOpend
    },
    oColors() {
      return Object.assign(this.color, this.colors)
    }
  }
}
</script>
