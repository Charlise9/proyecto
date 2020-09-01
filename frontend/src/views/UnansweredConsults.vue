<template>
  <div class="unansweredConsults">
    <vue-headful title="Hack A DOCTOR | Consultas pendientes de responder" />
    <h1>Consultas pendientes de respuesta</h1>

    <unansweredcard :notAnswers="notAnswers" />

    <button class="back" @click="goBack()">Volver</button>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthToken } from "../helpers/utils";
import unansweredcard from "@/components/UnansweredConsultsCustom.vue";

export default {
  name: "UnansweredConsults",
  components: {
    unansweredcard,
  },
  data() {
    return {
      notAnswers: [],
    };
  },
  props: {
    userId: String,
  },
  methods: {
    // FUNCIÓN PARA VER LAS CONSULTAS PENDIENTES DE RESPUESTA QUE TIENE UN MÉDICO
    async getNotAnswer(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS A SERVER
        const response = await axios.get(
          `http://localhost:3000/doctors/${id}/consults/unanswered`,
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

        /* console.log(response.data.data); */

        this.notAnswers = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getNotAnswer();
  },
};
</script>

<style scoped>
.unansweredConsults {
  position: relative;
  min-height: 85vh;
}

.unansweredConsults:before {
  background-image: url("../assets/unansweredconsults-wallpaper.jpg");
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