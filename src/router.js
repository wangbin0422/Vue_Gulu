import Vue from 'vue';
import VueRouter from 'vue-router';
import ButtonExample from './Button/Button.example';
import LayoutExample from './layout/Layout.example';
import TableExample from './table/Table.example';

Vue.use(VueRouter);

const routes = [
  {path: '*', redirect: '/button'},
  {path: '/button', component: ButtonExample},
  {path: '/layout', component: LayoutExample},
  {path: '/table', component: TableExample}
];

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
});

export default router;