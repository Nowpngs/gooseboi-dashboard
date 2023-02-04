import UserLogin from '../components/UserLogin.vue';
import HomePage from '../components/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import mainRoutes from './main-routers.js';

const routes = [
  {
    name: 'Home',
    component: HomePage,
    path: '/',
    children: [...mainRoutes],
  },
  {
    name: 'Login',
    component: UserLogin,
    path: '/login',
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
