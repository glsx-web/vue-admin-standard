<template>
<el-container>
  <el-aside width="auto"><gl-app-aside /></el-aside>
  <el-container>
    <el-header><gl-app-header/></el-header>
    <el-main> <gl-app-main/></el-main>
    <el-footer><gl-app-footer/></el-footer>
  </el-container>
</el-container>
</template>
<script>
import { GlAppHeader, GlAppAside, GlAppMain, GlAppFooter } from '@/components/GL-Layout'
import { ResizeHandler } from './mixins'

export default {
  name: 'layout',
  components: {
    GlAppHeader,
    GlAppAside,
    GlAppMain,
    GlAppFooter
  },
  mixins: [ResizeHandler]
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .el-main{
      padding: 0 !important;
    }
    .el-header{
      height: auto !important;
      padding: 0 1px;
    }
    .el-footer{
      padding: 0 !important;
    }
</style>

