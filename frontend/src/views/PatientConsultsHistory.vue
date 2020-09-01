<template>
  <div class="patientConsultsHistory">
    <vue-headful title="Hack A DOCTOR | Historial de consultas" />

    <h1>Historial de consultas</h1>

    <!-- <div>
      <p>Ordenar:</p>
      <select v-model="order">
        <option value></option>
        <option value="seriusness">Gravedad</option>
        <option value="date">Fecha</option>
      </select>
    </div>

    <div>
      <p>Orden asc/desc:</p>
      <select v-model="direction">
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
    </div>-->

    <patientconsults :consults="consults" />

    <router-link :to="{  name: 'ViewUserProfile', params:{ id:userId} }">
      <button class="back">Volver</button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthToken } from "../helpers/utils";
import patientconsults from "@/components/ConsultsHistoryCustom.vue";

export default {
  name: "PatientConsultsHistory",
  components: {
    patientconsults,
  },
  data() {
    return {
      consults: [],
      order: "",
      direction: "",
      userId: "",
    };
  },

  methods: {
    // FUNCIÓN PARA VER EL HISTORIAL DE CONSULTAS
    async getConsults(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS A SERVER
        const response = await axios.get(
          `http://localhost:3000/users/${id}/consults`,
          {
            headers: {
              Authorization: `${getAuthToken()}`,
              /* order: */
            },
          }
        );

        /* console.log(response.data.data); */

        this.consults = response.data.data;
        this.userId = id;
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
.patientConsultsHistory {
  position: relative;
  min-height: 85vh;
}

.patientConsultsHistory:before {
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