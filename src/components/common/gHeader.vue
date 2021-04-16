<template>
  <div class="gHeader">
    <div class="pull_left">
      <el-menu mode="horizontal" default-active="m1" menu-trigger="click">
        <el-menu-item index="m1">微信小程序</el-menu-item>
        <!-- <el-menu-item index="2">微信公众号</el-menu-item> -->
      </el-menu>
    </div>

    <div class="pull_right">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          管理员<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>退出登录</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
          <el-dropdown-item disabled>双皮奶</el-dropdown-item>
          <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
.gHeader {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}
.el-menu {
  border: none;
}

.gHeader,
.el-menu-item {
  color: #000;
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
