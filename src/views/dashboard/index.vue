<template>
  <div class="dashboard-container">
     <MDinput name="name" v-model="title" required :maxlength="100" v-gl-if="title">
        {{title}}
      </MDinput>
      <el-button @click="click"></el-button>
    <div class="dashboard-text">name:{{name}}{{title}}</div>
    <div class="dashboard-text">roles:<span v-for='(role,$index) in roles' :key='$index'>{{role}}</span></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { login } from '@/api/user'
import MDinput from '@/components/MDinput'
export default {
  name: 'dashboard',
  components: {
    MDinput
  },
  data() {
    return {
      title: login.p[0]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  methods: {
    click() {
      this.$router.push({ path: '/example/tree', query: { id: 1 }})
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
