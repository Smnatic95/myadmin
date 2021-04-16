<template>
  <div class="home">
    <el-container>

      <el-aside width="200px">
        <sideBar></sideBar>
      </el-aside>

      <el-container>

        <el-header>
          <gHeader></gHeader>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
  
    </el-container>
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
.el-container:nth-of-type(1){
  width: 200px;
}

.el-aside{
  padding: 0;
}

.el-header{
  width: calc(100vw - 200px);
  padding: 0;
}

.el-container:nth-of-type(2){
  width: calc(100vw - 200px);
}

</style>
