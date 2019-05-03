import Vue from 'vue';
import Button from './Button/Button';
import Icon from './Icon';

Vue.component('ui-button', Button);
Vue.component('ui-icon', Icon);

new Vue({
  el: '#app',
  data: {
    loading: false
  }
});