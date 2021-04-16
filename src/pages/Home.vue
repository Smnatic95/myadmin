<template>
  <div class="home">
    <sideBar></sideBar>
    <div class="main_right">
      <gHeader></gHeader>
      <div class="mainCnt">
        <router-view></router-view>
      </div>
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
  methods: {}
};
</script>

<style scoped>
.home {
  padding-left: 200px;
}
.main_right {
  width: calc(100vw - 200px);
 
}
.mainCnt{
  background-color: #eee;
  width: 100%;
  overflow: auto;
  box-sizing: border-box;
  padding:20px;
  min-height: calc(100vh - 60px);
}
</style>
