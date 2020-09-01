<template>
  <div class="login">
    <h1>Login de paciente</h1>
    <input v-model="userPatient" type="email" placeholder="Email de usuario" />
    <input v-model="passwordPatient" type="password" placeholder="Contraseña" />

    <div class="buttons">
      <button @click="loginPatientUser()">Login</button>
      <router-link :to="{  name: 'PatientRegister' }">
        <button>REGISTRARSE</button>
      </router-link>

      <button @click="seeRecoverModal=true">¿Has olvidado tu contraseña?</button>
    </div>

    <!--  MODAL PARA RECUPERAR LA CONTRASEÑA -->
    <div v-show="seeRecoverModal" class="modal">
      <div class="modalBox">
        <h3>Recupera tu contraseña</h3>
        <p>Introduce tu correo de usuario, al que se te enviará el código para recupear tu contraseña</p>
        <input type="email" placeholder="Email" v-model="recuperationMail" />

        <div class="buttons">
          <button class="cancel" @click="seeRecoverModal =! seeRecoverModal">Cancelar</button>
          <button @click="sendRecoverCode()">Enviar</button>
        </div>
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

        <div class="buttons">
          <button class="cancel" @click="seeResetModal =! seeResetModal">Cancelar</button>
          <button @click="resetPassword()">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginPatient } from "../helpers/utils";
import axios from "axios";

export default {
  name: "LoginPatient",
  data() {
    return {
      userPatient: "",
      passwordPatient: "",
      recuperationMail: "",
      seeRecoverModal: false,
      recoverCode: "",
      newPassword: "",
      repeatNewPassword: "",
      seeResetModal: false,
    };
  },
  methods: {
    // FUNCIÓN PARA LOGUEAR AL PACIENTE
    loginPatientUser() {
      if (this.userPatient === "" || this.passwordPatient === "") {
        alert("Te faltan datos.");
      } else {
        /* console.log(this.userPatient, this.passwordPatient); */
        loginPatient(this.userPatient, this.passwordPatient).then(() => {
          this.$router.push("/");

          this.$emit("login");
        });

        /* setTimeout(() => {
          location.reload();
        }, 500); */
      }
    },
    // FUNCIÓN PARA ENVIAR UN CÓDIGO DE RECUPERACIÓN DE CONTRASEÑA
    async sendRecoverCode() {
      try {
        // LLAMADA DE AXIOS A SERVER
        const response = await axios.post(
          "http://localhost:3000/users/recover-password",
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
            "http://localhost:3000/users/reset-password",
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
.login {
  position: relative;
  min-height: 85vh;
}

.login:before {
  background-image: url("../assets/login-wallpaper.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  opacity: 0.5;
  min-height: 100%;
  z-index: -1;
  content: " ";
  display: block;
  position: absolute;
  width: 100%;
}
</style>