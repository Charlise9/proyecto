<template>
  <div class="doctorConsultsHistory">
    <vue-headful title="e-DOCTOR | Historial de consultas" />

    <h1>Historial de consultas</h1>

    <div class="filters">
      <p>Ordenar:</p>
      <select v-model="order">
        <option value></option>
        <option value="seriusness">Gravedad</option>
        <option value="date">Fecha</option>
      </select>
    </div>

    <div class="filters">
      <p>Orden asc/desc:</p>
      <select v-model="direction">
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>

    <button @click="getConsults()">Aplicar filtros</button>

    <doctorconsults :consults="consults" />

    <button class="back" @click="goBack()">Volver</button>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthToken } from "../helpers/utils";
import doctorconsults from "@/components/ConsultsHistoryCustom.vue";

export default {
  name: "DoctorConsultsHistory",
  components: {
    doctorconsults,
  },
  data() {
    return {
      consults: [],
      order: "date",
      direction: "asc",
    };
  },
  methods: {
    // FUNCIÓN PARA VER EL HISTORIAL DE CONSULTAS
    async getConsults(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS A SERVER
        const response = await axios.get(
          `http://localhost:3000/doctors/${id}/consults?order=${this.order}&direction=${this.direction}`,
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

        /* console.log(response.data.data); */

        this.consults = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getConsults();
  },
};
</script>

<style scoped>
.filters {
  width: 73vh;
  margin: 0 auto;
}

.doctorConsultsHistory {
  position: relative;
  min-height: 85vh;
}

.doctorConsultsHistory:before {
  background-image: url("../assets/doctorconsultshistory-wallpaper.jpg");
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