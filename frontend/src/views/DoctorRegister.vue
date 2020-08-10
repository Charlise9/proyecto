<template>
  <div class="doctorregister">
    <vue-headful title="Hack A DOCTOR  | Registro Médico" />
    <h1>Registrarse como médico</h1>

    <input type="text" v-model="name" placeholder="Name" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Contraseña" />
    <input type="password" v-model="repeatPassword" placeholder="Confirmar contraseña" />
    <input type="number" v-model="collegiateNumber" placeholder="Nº de colegiado" />
    <input type="text" v-model="speciality" placeholder="Especialidad" />
    <input type="date" v-model="experience" placeholder="Fecha de colegiado" />

    <button @click="validatingData()">Registrarse</button>
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
        this.addNewDoctor();
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
        } catch (error) {
          console.error;
        }
      }
    },
  },
};
</script>

<style scoped>
</style>