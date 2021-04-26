import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAMap from 'vue-amap';
import App from './App.vue';
import router from './router';
import store from './store';
import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import axios from '@/providers/request.js';

Vue.use(ElementUI);
Vue.use(VueAMap);
Vue.use(Avue);
Vue.prototype.$axios = axios;
VueAMap.initAMapApiLoader({
  key: '14ddb9a3b43d3d43752f8d34b30c3a92',
  plugin: ['AMap.Autocomplete', 'AMap.MouseTool','AMap.polyline','AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
