<template>
  <div class="home">
    <vue-headful title="Hack A DOCTOR  | Inicio" />

    <h1 id="title">Hack A DOCTOR</h1>

    <div class="filters">
      <p>Ordenar:</p>
      <select v-model="order">
        <option value></option>
        <option value="alphabetic">A-Z</option>
        <option value="experience">Experiencia</option>
      </select>
    </div>

    <div class="filters">
      <p>Orden asc/desc:</p>
      <select v-model="direction">
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>

    <doctorscard @doctorsList="getDoctors" :doctors="doctors" />
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
      order: "alphabetic",
      direction: "asc",
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
            order: this.order,
            direction: this.direction,
          },
        });

        console.log(response.data);

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

<style scoped>
.filters {
  width: 73vh;
  margin: 0 auto;
}

.home {
  position: relative;
  min-height: 85vh;
}

.home:before {
  background-image: url("../assets/home-wallpaper.jpg");
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
