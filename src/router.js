import VueRouter from 'vue-router';
import {Button} from './index';

const routes = [
  {path: '/button', component: Button}
];

const router = new VueRouter({
  routes
});

export default router;