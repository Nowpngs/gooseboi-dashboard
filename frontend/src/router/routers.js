import UserLogin from '../views/UserLogin.vue';
import HomePage from '../components/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    name: 'Home',
    component: HomePage,
    path: '/',
  },
  {
    name: 'Login',
    component: UserLogin,
    path: '/login',
  },
];

const router = createRouter({ history: createWebHistory(), routes });

export default router;
