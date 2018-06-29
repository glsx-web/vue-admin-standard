<template>
  <el-dropdown trigger="click" class='international' @command="handleSetLanguage">
    <div>
      <svg-icon class-name='international-icon' icon-class="language" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh" :disabled="lang==='zh'">中文</el-dropdown-item>
      <el-dropdown-item command="en" :disabled="lang==='en'">English</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    language: {
      type: String,
      default: 'zh'
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.lang = lang
      this.$emit('@setLanguage', lang)
    }
  },
  data() {
    return {
      lang: this.language
    }
  }
}
</script>

<style scoped>
.international-icon {
  display: inline-block;
	cursor: pointer;
	width: 20px;
	height: 20px;
  fill: #fff;
  vertical-align: -6px!important;
}
</style>


