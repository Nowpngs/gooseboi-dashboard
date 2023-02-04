import UserLogin from '../components/UserLogin.vue';
import HomePage from '../components/HomePage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import mainRoutes from './mainRouters.js';
import { authGuard } from '@/router/authGuard.js';

const routes = [
  {
    name: 'Home',
    component: HomePage,
    path: '/',
    beforeEnter: authGuard,
    children: [...mainRoutes],
  },
  {
    name: 'Login',
    component: UserLogin,
    path: '/login',
  },
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  // if the route is not found, redirect to home
  if (!to.matched.length) {
    next('/');
  } else {
    next();
  }
});

export default router;
