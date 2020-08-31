<template>
  <div class="mailValidation">
    <h1>Usuario activado</h1>
    <h3>Ya puedes loguearte</h3>

    <router-link :to="{name: 'LoginDoctor'}">
      <button>Ir al login</button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DoctorMailValidation",
  methods: {
    async doctorValidation() {
      let url = window.location.href;
      let registrationCode = url.split("?");

      try {
        const response = await axios.get(
          "http://localhost:3000/doctors/validate/" + registrationCode[1]
        );

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.doctorValidation();
  },
};
</script>

<style scoped>
</style>