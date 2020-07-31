<template>
  <div class="home">
    <h1>Bienvenido a Consultas Médicas Online</h1>
    <doctorscard :doctors="doctors" />
  </div>
</template>

<script>
import axios from "axios";
import doctorscard from "@/components/DoctorsCard.vue";

export default {
  name: "Home",
  components: {
    doctorscard,
  },
  data() {
    return {
      doctors: [],
    };
  },
  methods: {
    // FUNCIÓN PARA MOSTRAR LOS DOCTORES
    getDoctors() {
      let self = this;
      // LLAMADA DE AXIOS A SERVER
      axios
        .get("http://localhost:3000/doctors")
        .then(function (response) {
          console.log(response);
          self.doctors = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getDoctors();
  },
};
</script>
