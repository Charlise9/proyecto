<template>
  <div class="doctorregister">
    <vue-headful title="Hack A DOCTOR  | Registro Médico" />
    <h1>Registrarse como médico</h1>

    <input type="text" v-model="name" placeholder="Nombre" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Contraseña" />
    <input type="password" v-model="repeatPassword" placeholder="Confirmar contraseña" />
    <input type="number" v-model="collegiateNumber" placeholder="Nº de colegiado" />
    <input type="text" v-model="speciality" placeholder="Especialidad" />
    <label for="Experience">Fecha de colegiado</label>
    <input type="date" id="Experience" v-model="experience" placeholder="Fecha de colegiado" />

    <div class="buttons">
      <button class="cancel" @click="goBack()">Cancelar</button>

      <button @click="validatingData()">Registrarse</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "DoctorRegister",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      collegiateNumber: "",
      speciality: "",
      experience: "",
      createDoctor: false,
    };
  },
  methods: {
    sweetalertError() {
      Swal.fire({
        title: "¡ALERTA!",
        text: "Tienes campos vacíos",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    },
    sweetalertErrorPassword() {
      Swal.fire({
        title: "¡ALERTA!",
        text: "No coinciden las contraseñas",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    },
    sweetalertNewDoctor() {
      Swal.fire({
        title: "USUARIO CREADO!",
        text:
          "Se te ha enviado un correo de verificación al email que nos has proporcionado",
        icon: "success",
        confirmButtonText: "Ok",
        onClose: () => {
          this.addNewDoctor();
        },
      });
    },
    validatingData() {
      if (
        this.name === "" ||
        this.email === "" ||
        this.password === "" ||
        this.repeatPassword === "" ||
        this.collegiateNumber === "" ||
        this.speciality === "" ||
        this.experience === ""
      ) {
        this.sweetalertError();
        this.createDoctor = false;
      } else if (this.password !== this.repeatPassword) {
        this.sweetalertErrorPassword();
        this.createDoctor = false;
      } else {
        this.createDoctor = true;
        this.sweetalertNewDoctor();
      }
    },
    async addNewDoctor() {
      if (this.createDoctor === true) {
        try {
          // LLAMADA DE AXIOS A SERVER
          const response = await axios.post("http://localhost:3000/doctors", {
            name: this.name,
            email: this.email,
            password: this.password,
            collegiateNumber: this.collegiateNumber,
            speciality: this.speciality,
            experience: this.experience,
          });

          console.log(response.data.data);

          this.createDoctor = false;
          this.name = "";
          this.email = "";
          this.password = "";
          this.repeatPassword = "";
          this.collegiateNumber = "";
          this.speciality = "";
          this.experience = "";

          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 500);
        } catch (error) {
          console.error;
        }
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.buttons {
  display: block;
}

.doctorregister {
  position: relative;
  min-height: 85vh;
}

.doctorregister:before {
  background-image: url("../assets/register-wallpaper.jpg");
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