<template>
  <div id="map" style="height: 800px"></div>
</template>

<script>
import L from "leaflet";

var geoData1 = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [51.5150456546981,  -0.0926971435546875]
      },
      "properties": {
        "description": "这是一个地点的描述！",
        "color": "red"
      }
    },
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [55.5150456546981,  -0.1926971435546875]
      },
      "properties": {
        "description": "这是一个地点的描述！",
        "color": "red"
      }
    } 
  ]
};

export default {
  name: "YourMapComponent",
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 创建地图实例
      const map = L.map("map").setView([51.505, -0.09], 1);

      //解析geojson并且在地图上添加一个点
      L.geoJSON(geoData1,{
          style: function (feature) {
              return {color: feature.properties.color};
          }
      }).bindPopup(function (layer) {
        return layer.feature.properties.description;
      }).addTo(map);


      // 添加瓦片图层
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      var latlngArr = [];

      //给地图添加点击事件
      map.on("click", function (e) {
        //经纬度坐标
        const latlng = e.latlng;
        console.log(latlng)
        latlngArr.push(latlng)
        //设置地图的坐标
        //map.setView(latlng, 7);
        //添加标记
        L.marker(latlng).addTo(map);
        const l = latlngArr.length;
        if (l > 1) {
          L.polyline([latlngArr[l - 2],latlngArr[l - 1]],{opacity: 1,color:'red',smoothFactor: 5 })
          /* 
          frequency: 频率
                  'allvertices' renders an arrowhead on each vertex.
                  'endonly' renders only one at the end.
                  A number value renders that number of arrowheads evenly spaces across the polyline.
                  A string value with suffix 'm' (i.e. '100m') will render arrowheads spaced evenly along the polyline with roughly that many meters between each one.
                  A string value with suffix 'px' (i.e. '30px') will render arrowheads spaced evenly with roughly that many pixels between each, regardless of zoom level.
          size: 箭头大小  
           */
          .arrowheads({fill: true,frequency: 'endonly',  size: '12px'})
          .addTo(map);
        }
      });


    },
  },
};
</script>

<style>
@import "~leaflet/dist/leaflet.css";
/* 这里的路径可能需要根据你的项目结构进行调整 */
</style>
