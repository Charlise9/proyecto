<template>
  <div class="patientregister">
    <vue-headful title="Hack A DOCTOR  | Registro Paciente" />
    <h1>Registrarse como paciente</h1>

    <input type="text" v-model="name" placeholder="Name" />
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Contraseña" />
    <input type="password" v-model="repeatPassword" placeholder="Confirmar contraseña" />
    <input type="text" v-model="dni" placeholder="DNI" />
    <input type="number" v-model="socialSecurityNumber" placeholder="Nº de la Seguridad Social" />

    <button @click="validatingData()">Registrarse</button>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "PatientRegister",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      dni: "",
      socialSecurityNumber: "",
      createPatient: false,
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
    sweetalertNewUser() {
      Swal.fire({
        title: "USUARIO CREADO!",
        text:
          "Se te ha enviado un correo de verificación al email que nos has proporcionado",
        icon: "success",
        confirmButtonText: "Ok",
        onClose: () => {
          this.addNewPatient();
        },
      });
    },
    validatingData() {
      if (
        this.name === "" ||
        this.email === "" ||
        this.password === "" ||
        this.repeatPassword === "" ||
        this.dni === "" ||
        this.socialSecurityNumber === ""
      ) {
        this.sweetalertError();
        this.createPatient = false;
      } else if (this.password !== this.repeatPassword) {
        this.sweetalertErrorPassword();
        this.createPatient = false;
      } else {
        this.createPatient = true;
        this.sweetalertNewUser();
      }
    },
    async addNewPatient() {
      if (this.createPatient === true) {
        try {
          // LLAMADA DE AXIOS A SERVER
          const response = await axios.post("http://localhost:3000/users", {
            name: this.name,
            email: this.email,
            password: this.password,
            dni: this.dni,
            socialSecurityNumber: this.socialSecurityNumber,
          });

          console.log(response.data.data);

          this.createPatient = false;
          this.name = "";
          this.email = "";
          this.password = "";
          this.repeatPassword = "";
          this.dni = "";
          this.socialSecurityNumber = "";
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