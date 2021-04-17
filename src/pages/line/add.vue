<template>
  <div class="addLine">
    <div class="panel_operations">
      <template v-if="map">
        <template>
          <template v-if="!mylvULine.path.length && !drawLineIng">
            <el-button type="primary" @click="stratDraw"
              >开始绘制线路</el-button
            >
          </template>
          <template v-else>
            <el-button type="primary" @click="stratDraw"
              >重新绘制线路</el-button
            >
            <el-button type="danger" @click="clearLine"
              >清除绘制的线路</el-button
            >
          </template>
        </template>

        <template>
          <el-button type="primary" @click="addMarker" v-if="!addMarkerIng"
            >添加景点</el-button
          >
          <el-button type="primary" @click="endAddMarker" v-else
            >结束添加景点</el-button
          >
          <el-button
            type="danger"
            @click="clearAllMarkers"
            v-if="jingQumarkers.length"
            >清除所有景点</el-button
          >
        </template>
      </template>
    </div>
    <div class="amap-wrapper">
      <el-amap
        ref="addLineMap"
        vid="addLineMap"
        :AMapManager="amapManager"
        :events="mapEvents"
      >
        <el-amap-marker
          v-for="(marker, index) in jingQumarkers"
          :key="index"
          :position="marker.position"
          :draggable="true"
        ></el-amap-marker>
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
        init: (map) => {
          this.map = map;
        },
        complete: (e) => {
          this.mapLoadEnd();
        },
        click: (e) => {
          this.handleMapClick(e);
        },
      },
      jingQumarkers: [],
      mylvULine: {
        path: [],
        length: 0,
      },
      mouseTool: null,
      drawLineIng: false,
      addMarkerIng: false,
    };
  },
  mounted() {},
  methods: {
    addMarker() {
      this.addMarkerIng = true;
    },
    endAddMarker() {
      this.addMarkerIng = false;
    },
    clearAllMarkers() {
      this.jingQumarkers = [];
    },
    mapLoadEnd() {},
    clearLine() {
      this.mylvULine = {
        path: [],
        length: 0,
      };
      this.mouseTool.close(true);
      this.drawLineIng = false;
    },
    handleMapClick(e) {
      if (this.addMarkerIng) {
        this.jingQumarkers.push({
          position: [e.lnglat.lng, e.lnglat.lat],
        });
      }
    },
    stratDraw() {
      if (this.mouseTool) {
        this.clearLine();
      }
      this.drawLine();
    },
    drawLine() {
      let mouseTool = new AMap.MouseTool(this.map),
        _this = this;
      this.mouseTool = mouseTool;
      this.drawLineIng = true;
      this.addMarkerIng = false;
      const callbackFn = function (e) {
        AMap.event.removeListener(mouseTool, "draw", callbackFn);
        mouseTool.close(false);
        _this.mylvULine = {
          path: e.obj.getPath(),
          length: e.obj.getLength(),
        };
        console.log("绘制结果", _this.mylvULine);
      };
      AMap.event.addListener(mouseTool, "draw", callbackFn);
      mouseTool.polyline({
        strokeColor: "#E32631",
        strokeWeight: 5,
      });
    },
  },
};
</script>

<style scoped>
.amap-wrapper {
  width: 100%;
  height: 750px;
}
.panel_operations {
  padding-bottom: 20px;
}
</style>
