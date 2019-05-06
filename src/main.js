import Vue from 'vue';
import router from './router';
import Demo from './demo.vue';
import './styles/style.scss'

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(Demo)
}).$mount('#app');