<template>
  <div id="map" style="height: 1200px"></div>
</template>

<script>
import L from "leaflet";

export default {
  name: "YourMapComponent",
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 创建地图实例
      const map = L.map("map").setView([51.505, -0.09], 13);

      // 添加瓦片图层
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      var marker;

      //给地图添加点击事件
      map.on("click", function (e) {
        if (marker) {
          marker.remove();
        }

        //经纬度坐标
        var latlng = e.latlng;
        //设置地图的坐标
        //map.setView(latlng, 7);
        //添加标记
        marker = L.marker(latlng, {
          iconUrl:
            "https://cdn.pixabay.com/photo/2013/07/13/10/29/icon-157354_1280.png",
          iconSize: [30, 50],
        }).addTo(map);
        marker._leaflet_id = "marker1";
      });
    },
  },
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
/* 这里的路径可能需要根据你的项目结构进行调整 */
</style>
