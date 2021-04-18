<template>
  <el-menu
    class="sideBar"
    :default-active="DFAcive"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"
    :router="true"
  >
    <el-menu-item index="/Home">
      <i class="el-icon-menu"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>路线管理</span>
      </template>
      <el-menu-item index="/lineList">路线列表</el-menu-item>
      <el-menu-item index="/addLine">新增路线</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>报名管理</span>
      </template>
      <el-menu-item index="/signUpList">报名列表</el-menu-item>
      <el-menu-item index="/signUpSettings">报名设置</el-menu-item>
      <el-menu-item index="/signUpStatistics">报名统计</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "sideBar",
  data() {
    return {
      DFAcive: null,
    };
  },
  props: {},
  created() {
    console.log(this.$route.path);
    this.DFAcive = this.$route.path;
  },
};
</script>

<style scoped>
.sideBar {
  width: 200px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: auto;
  border: none;
}
</style>
