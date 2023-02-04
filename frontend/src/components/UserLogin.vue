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
      // Create the payload object
      const payload = {
        email: this.username,
        password: this.password,
      };
      // Call the login function from the API
      await login(payload)
        .then((response) => {
          // If the call is successful, store the token, email and role in localStorage
          localStorage.setItem('token', response.data.authorization);
          localStorage.setItem('role', response.data.data.role);
          localStorage.setItem('email', response.data.data.email);
          // Navigate to the Home page
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
