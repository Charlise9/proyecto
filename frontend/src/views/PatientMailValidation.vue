<template>
  <div class="mailValidation">
    <vue-headful title="e-DOCTOR | Usuario activado" />

    <h1>Usuario activado</h1>
    <h3>Ya puedes loguearte</h3>

    <router-link :to="{name: 'LoginPatient'}">
      <button>Ir al login</button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "PatientMailValidation",
  methods: {
    async patientValidation() {
      let url = window.location.href;
      let registrationCode = url.split("?");

      try {
        const response = await axios.get(
          "http://localhost:3000/users/validate/" + registrationCode[1]
        );

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.patientValidation();
  },
};
</script>

<style scoped>
.mailValidation {
  position: relative;
  min-height: 85vh;
}

.mailValidation:before {
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