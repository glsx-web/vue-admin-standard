<template>
   <gl-scroll :height="main.height">
          <app-main :cachedViews="main.cachedViews" />
      </gl-scroll>
</template>

<script>
import { mapGetters } from 'vuex'
import glScroll from '@/components/GL-Scroll'
import AppMain from './AppMain'
const EXCLUDE = 124
/**
 * 默认颜色
 */
export default {
  name: 'GLAppMain',
  components: {
    AppMain,
    glScroll
  },
  computed: {
    ...mapGetters([
      'clientHeight',
      'cachedViews'
    ]),
    main() {
      return {
        height: this.clientHeight - EXCLUDE,
        cachedViews: this.cachedViews
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .el-main{
      padding: 0 !important;
    }
</style>