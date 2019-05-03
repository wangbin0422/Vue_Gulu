import Vue from 'vue';
import Button from './Button/Button';

Vue.component('ui-button', Button);

new Vue({
  el: '#app',
  data: {
    loading: false
  }
});