<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { DASHBOARD } from '@/utils/const'
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      var matched = this.$route.matched.filter(item => item.name)
      const first = this._.head(matched)
      if (first && first.name.toLowerCase() !== DASHBOARD.name.toLowerCase()) {
        matched = [DASHBOARD].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/variables.scss";
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: $fontColor;
      cursor: text;
    }
    .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
      color: $breadLinkColor;
      &:hover{
        color: $breadLinkHover
      }
    }
  }
</style>
