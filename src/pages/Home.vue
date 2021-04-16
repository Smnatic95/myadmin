<template>
  <div class="home">
    <sideBar></sideBar>
    <div class="main_right">
      <gHeader></gHeader>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import sideBar from "../components/common/sideBar";
import gHeader from "../components/common/gHeader";

export default {
  name: "Home",
  components: {
    sideBar,
    gHeader,
  },
  methods: {},
};
</script>

<style scoped>
.home {
  padding-left: 200px;
}
.main_right {
  width: calc(100vw - 200px);
  overflow: hidden;
}
</style>
