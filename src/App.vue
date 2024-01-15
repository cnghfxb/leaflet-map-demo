<template>
  <div id="map" style="height: 600px"></div>
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
      const map = L.map("map").setView([39.907325,116.391367], 10);

    /*   var personIcon = L.icon ({
        iconUrl: './assets/person-icon.png',
        iconSize: [20,20]
      }) */
      var mark = L.marker ([39.907325,116391367]).addTo(map);

      // 添加瓦片图层
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map)

      
      // 创建一个标记的图层组
      var markerGroup = L.layerGroup().addTo(map);

      map.on('click',(e) => {
        var markers = markerGroup.getLayers();
        if (markers.length === 2) {
          markerGroup.clearLayers();
        }
        //添加标记
        L.marker(e.latlng).addTo(markerGroup);
   
        if (markerGroup.getLayers().length === 2) {
          const marks = markerGroup.getLayers()
          console.log(markerGroup.getLayers())
          L.Routing.control({
            waypoints: [
              L.latLng([marks[0]._latlng.lat,marks[0]._latlng.lng]),
              L.latLng([marks[1]._latlng.lat,marks[1]._latlng.lng])
            ]
          }).on('routesfound',(e) => {
            e.routes[0].coordinates.forEach((coord,index) => {
              setTimeout(() => {
                console.log ('111222333')
                mark.setLatLng([coord.lat,coord.lng])
              },100*index)
            })
          }).addTo(map)
        }
      })
    },
  },
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
/* 这里的路径可能需要根据你的项目结构进行调整 */
</style>
