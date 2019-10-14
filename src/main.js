import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/router.js';
import Http from './net/http.js';
import Commen from './commen/Commen.js';
import './commen/Commen.css';


Vue.use(ElementUI);
Vue.use(Http);
//Vue.use(Commen);

Vue.config.productionTip = false;
Vue.prototype.$commen = Commen;
 
new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')