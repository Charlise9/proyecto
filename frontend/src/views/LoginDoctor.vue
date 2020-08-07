<template>
  <div class="login">
    <h1>Login de médico</h1>
    <input v-model="userDoctor" type="email" placeholder="Email de usuario" />
    <input v-model="passwordDoctor" type="password" placeholder="Contraseña" />
    <button @click="loginDoctorUser()">Login</button>
  </div>
</template>

<script>
import { loginDoctor } from "../helpers/utils";

export default {
  name: "LoginDoctor",
  data() {
    return {
      userDoctor: "",
      passwordDoctor: "",
    };
  },
  methods: {
    loginDoctorUser() {
      if (this.userDoctor === "" || this.passwordDoctor === "") {
        alert("Te faltan datos.");
      } else {
        console.log(this.userDoctor, this.passwordDoctor);
        loginDoctor(this.userDoctor, this.passwordDoctor);
      }
      setTimeout(() => {
        this.$router.push("/");
        location.reload();
      }, 500);
    },
  },
};
</script>

<style scoped>
</style>