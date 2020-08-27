<template>
  <div class="login">
    <h1>Login de médico</h1>
    <input v-model="userDoctor" type="email" placeholder="Email de usuario" />
    <input v-model="passwordDoctor" type="password" placeholder="Contraseña" />
    <button @click="loginDoctorUser()">Login</button>
    <router-link :to="{  name: 'DoctorRegister' }">
      <button>REGISTRARSE</button>
    </router-link>

    <button @click="seeRecoverModal=true">¿Has olvidado tu contraseña?</button>

    <!--  MODAL PARA RECUPERAR LA CONTRASEÑA -->
    <div v-show="seeRecoverModal" class="modal">
      <div class="modalBox">
        <h3>Recupera tu contraseña</h3>
        <p>Introduce tu correo de usuario, al que se te enviará el código para recupear tu contraseña</p>
        <input type="email" placeholder="Email" v-model="recuperationMail" />
        <button @click="seeRecoverModal =! seeRecoverModal">Cancelar</button>
        <button @click="sendRecoverCode()">Enviar</button>
      </div>
    </div>

    <!-- MODAL PARA RESETEAR LA CONTRASEÑA -->
    <div v-show="seeResetModal" class="modal">
      <div class="modalBox">
        <h3>Recupera tu contraseña</h3>
        <p>Introduce el código de recuperación que se envió por correo e introduce tu nueva contraseña</p>
        <input type="text" placeholder="Código de recuperación" v-model="recoverCode" />
        <input type="password" placeholder="Nueva contraseña" v-model="newPassword" />
        <input
          type="password"
          placeholder="Confirma la nueva contraseña"
          v-model="repeatNewPassword"
        />
        <button @click="seeResetModal =! seeResetModal">Cancelar</button>
        <button @click="resetPassword()">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginDoctor } from "../helpers/utils";
import axios from "axios";

export default {
  name: "LoginDoctor",
  data() {
    return {
      userDoctor: "carlosbarrientosguillen@gmail.com",
      passwordDoctor: "loremipsum",
      recuperationMail: "",
      seeRecoverModal: false,
      recoverCode: "",
      newPassword: "",
      repeatNewPassword: "",
      seeResetModal: false,
    };
  },
  methods: {
    // FUNCIÓN PARA LOGUEAR AL DOCTOR
    loginDoctorUser() {
      if (this.userDoctor === "" || this.passwordDoctor === "") {
        alert("Te faltan datos.");
      } else {
        /* console.log(this.userDoctor, this.passwordDoctor); */
        loginDoctor(this.userDoctor, this.passwordDoctor).then(() => {
          this.$router.push("/");

          this.$emit("login");
        });
      }
    },
    // FUNCIÓN PARA ENVIAR UN CÓDIGO DE RECUPERACIÓN DE CONTRASEÑA
    async sendRecoverCode() {
      try {
        // LLAMADA DE AXIOS A SERVER
        const response = await axios.post(
          "http://localhost:3000/doctors/recover-password",
          {
            email: this.recuperationMail,
          }
        );

        /* console.log(response.data.data); */

        this.recuperationMail = "";
        this.seeRecoverModal = false;
        this.seeResetModal = true;
      } catch (error) {
        console.log(error);
      }
    },
    // FUNCIÓN PARA RECUPERAR LA CONTRASEÑA
    async resetPassword() {
      if (this.newPassword !== this.repeatNewPassword) {
        console.log("Las contraseñas no coinciden");
      } else {
        try {
          // LLAMADA DE AXIOS A SERVER
          const response = await axios.post(
            "http://localhost:3000/doctors/reset-password",
            {
              recoverCode: this.recoverCode,
              newPassword: this.newPassword,
            }
          );

          /* console.log(response.data); */

          this.recoverCode = "";
          this.newPassword = "";
          this.repeatNewPassword = "";
          this.seeResetModal = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
</style>