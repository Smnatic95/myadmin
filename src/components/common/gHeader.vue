<template>
  <div class="gHeader">

      <el-menu class="member" mode="horizontal" menu-trigger="click">
        <el-menu-item>微信公众号</el-menu-item>
        <el-menu-item>微信小程序</el-menu-item>
      </el-menu>

      <el-menu class="login_info" mode="horizontal"  menu-trigger="click">
        <el-submenu index="2">
          <template slot="title">管理员</template>
          <el-menu-item index="2-1">退出登录</el-menu-item>
        </el-submenu>
      </el-menu>
   
  </div>
</template>

<script>
export default {
  name: "addLine",
  components: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style scoped>
    .gHeader{
        width:100%;
        display: flex;
        justify-content: space-between;
    }
    .member{
        width: calc(100% - 100px);
    }
    .login_info.el-menu {
        width: 100px;
    }
</style>
