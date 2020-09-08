<template>
  <div class="home">
    <vue-headful title="e-DOCTOR  | Inicio" />

    <h1 id="title">
      <span>e -</span> DOCTOR
    </h1>

    <div class="filters">
      <div>
        <p>
          <b>Ordenar:</b>
        </p>
        <select v-model="order">
          <option value></option>
          <option value="alphabetic">A-Z</option>
          <option value="experience">Experiencia</option>
        </select>
      </div>

      <div>
        <p>
          <b>Orden asc/desc:</b>
        </p>
        <select v-model="direction">
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
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
    this.getDoctors();
  },
};
</script>

<style scoped>
#app .home h1 {
  padding-top: 3rem;
  margin-bottom: 3rem;
  font-size: 4rem;
}

.filters {
  width: 20%;
  margin: 1rem auto;
  padding: 12px 20px;
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
