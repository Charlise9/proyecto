<template>
  <div class="login">
    <div class="loginpatient">
      <h1>Login de paciente</h1>
      <input v-model="userPatient" type="email" placeholder="Email de usuario" />
      <input v-model="passwordPatient" type="password" placeholder="Contraseña" />
      <button @click="loginPatientUser()">Login</button>
    </div>
    <div class="logindoctor">
      <h1>Login de médico</h1>
      <input v-model="userDoctor" type="email" placeholder="Email de usuario" />
      <input v-model="passwordDoctor" type="password" placeholder="Contraseña" />
      <button @click="loginDoctorUser()">Login</button>
    </div>
  </div>
</template>

<script>
import { loginPatient, loginDoctor } from "../helpers/utils";

export default {
  name: "LoginPatient",
  data() {
    return {
      userPatient: "",
      passwordPatient: "",
      userDoctor: "",
      passwordDoctor: "",
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