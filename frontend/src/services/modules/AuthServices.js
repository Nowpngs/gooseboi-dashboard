import axios from '../axios/axios.ts';

const AUTH_URL = {
  login: '/auth/login',
};

// Get the access token from the user
export const login = (payload) => {
  return axios.post(AUTH_URL.login, payload);
};
