import { createApp } from 'vue'
import App from './App.vue'
import L from 'leaflet';
import 'leaflet-arrowheads';
import 'leaflet/dist/leaflet.css';

import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine';

// 配置 Leaflet 默认图标路径
delete L.Icon.Default.prototype._getIconUrl;
//设置默认的地图图标
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


createApp(App).mount('#app')
