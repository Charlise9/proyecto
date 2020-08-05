<template>
  <div class="login">
    <h1>Login de paciente</h1>
    <input v-model="user" type="email" placeholder="Email de usuario" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <button @click="loginUser()">Login</button>
  </div>
</template>

<script>
import { loginPatient } from "../helpers/utils";

export default {
  name: "LoginPatient",
  data() {
    return {
      user: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      if (this.user === "" || this.password === "") {
        alert("Te faltan datos.");
      } else {
        console.log(this.user, this.password);
        loginPatient(this.user, this.password);
      }
      /* setTimeout(() => {
        this.$router.push("/");
        location.reload();
      }, 500); */
    },
  },
};
</script>

<style scoped>
</style>