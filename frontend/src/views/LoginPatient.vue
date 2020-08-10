<template>
  <div class="login">
    <h1>Login de paciente</h1>
    <input v-model="userPatient" type="email" placeholder="Email de usuario" />
    <input v-model="passwordPatient" type="password" placeholder="Contraseña" />
    <button @click="loginPatientUser()">Login</button>
    <router-link :to="{  name: 'PatientRegister' }">
      <button>REGISTRARSE</button>
    </router-link>
  </div>
</template>

<script>
import { loginPatient } from "../helpers/utils";

export default {
  name: "LoginPatient",
  data() {
    return {
      userPatient: "",
      passwordPatient: "",
    };
  },
  methods: {
    loginPatientUser() {
      if (this.userPatient === "" || this.passwordPatient === "") {
        alert("Te faltan datos.");
      } else {
        console.log(this.userPatient, this.passwordPatient);
        loginPatient(this.userPatient, this.passwordPatient);
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