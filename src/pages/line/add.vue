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

        <el-amap-polyline
          :path="polyline.path"
        ></el-amap-polyline>
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
      mouseTool: null,
      amapManager,
      mapEvents: {
        init: (o) => {
          this.map = o;
        },
        complete: (e) => {
          this.mouseTool = new AMap.MouseTool(this.map);
          this.drawPolyline();
        },
        click: (e) => {
         
          // this.markers.push({
          //   position: [e.lnglat.lng, e.lnglat.lat],
          // });

          // this.polyline.path.push([e.lnglat.lng, e.lnglat.lat]);
          //  if (this.mouseTool.polyline) {
          //   console.log(this.mouseTool.polyline().getPath());
          // }

          console.log(this.mouseTool)

        },
      },
      markers: [],
      polyline: {
        path: [],
      },
      curpolyline: null,
    };
  },
  mounted() {},
  methods: {
    drawPolyline() {
     this.mouseTool.polyline({
        strokeColor: "#3366FF",
        strokeOpacity: 1,
        strokeWeight: 6,
        // 线样式还支持 'dashed'
        strokeStyle: "solid"
      })
    },
  },
};
</script>

<style scoped>
.amap-wrapper {
  width: 100%;
  height: 500px;
}
</style>
