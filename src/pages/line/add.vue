<template>
  <div class="Login">
    <div class="amap-wrapper">
      <el-amap
        ref="addLineMap"
        vid="addLineMap"
        :AMapManager="amapManager"
        :events="mapEvents"
      >
        <el-amap-marker
          v-for="(marker, index) in markers"
          :key="index"
          :position="marker.position"
          :draggable="true"
        ></el-amap-marker>

        <el-amap-polyline :path="polyline.path"></el-amap-polyline>
      </el-amap>
    </div>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from "vue-amap";
let amapManager = new AMapManager(); //获取高德原生 AMap.Map
export default {
  name: "addLine",
  components: {},
  data() {
    return {
      map: null,
      amapManager,
      mapEvents: {
        init: (o) => {
          this.map = o;
        },
        click: (e) => {
          console.log(this, e.lnglat.lng, e.lnglat.lat);
          this.markers.push({
            position: [e.lnglat.lng, e.lnglat.lat],
          });

          this.polyline.path.push(
           [e.lnglat.lng, e.lnglat.lat]
          );

        },
      },
      markers: [],
      polyline: {
        path: [],
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style scoped>
.amap-wrapper {
  width: 100%;
  height: 500px;
}
</style>
