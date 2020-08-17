<template>
  <div class="home">
    <vue-headful title="Hack A DOCTOR  | Inicio" />

    <h1>Hack A DOCTOR</h1>
    <doctorscard v-on:doctorsList="getDoctors" :doctors="doctors" />
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
    async getDoctors(search) {
      try {
        // LLAMADA DE AXIOS A SERVER
        const response = await axios.get("http://localhost:3000/doctors", {
          params: {
            search: search,
          },
        });

        /* console.log(response.data); */

        this.doctors = response.data.data;
      } catch (error) {
        console.log(error);
      }

      /*  axios
        .get("http://localhost:3000/doctors", {
          params: {
            search: search,
          },
        })
        .then((response) => {
          console.log(response);
          this.doctors = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        }); */
    },
  },
  created() {
    // this.getDoctors();
  },
};
</script>
