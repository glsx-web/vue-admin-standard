<template>
    <div class="user-container">
      <el-tag>{{name}}</el-tag>
      <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
      <span @click="logout"><svg-icon icon-class="logout" class-name="logOut" /></span>
    </div>
</template>

<script>
    export default {
      name: 'navuser',
      props: {
        avatar: {
          type: String
        },
        name: {
          type: String
        },
        logout: {
          type: Function
        }
      }
    }
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/variables.scss";
  .user-container{
    display: inline-block;
    .el-tag{
        color: $fontColor
    }
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      vertical-align: middle;
      margin-right: 20px;
    }
    .logOut {
        font-size: 20px;
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        color: $fontColor;
    }
  }
</style>