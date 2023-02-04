<template>
  <h1>Login Page</h1>
  <div>
    <input type="text" v-model="username" placeholder="Username" />
    <input type="password" v-model="password" placeholder="Password" />
    <button v-on:click="login">Login</button>
  </div>
</template>

<script>
import { login } from '../services/modules/AuthServices.js';
export default {
  name: 'UserLogin',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      const payload = {
        email: this.username,
        password: this.password,
      };
      await login(payload)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
