import { tokenExpired } from '../helpers/tokenHelper.js';

export const authGuard = (to, from, next) => {
  // get the token from localStorage
  const token = localStorage.getItem('token');

  // if the token is present and not expired, continue to the route
  if (token && !tokenExpired(token)) {
    next();
  } else {
    // if the token is not present, redirect to login
    next('/login');
  }
};
