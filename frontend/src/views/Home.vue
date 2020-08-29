<template>
  <div class="home">
    <vue-headful title="Hack A DOCTOR  | Inicio" />

    <h1>Hack A DOCTOR</h1>

    <div>
      <p>Ordenar:</p>
      <select v-model="order">
        <option value></option>
        <option value="alphabetic">A-Z</option>
        <option value="experience">Experiencia</option>
      </select>
    </div>

    <div>
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
