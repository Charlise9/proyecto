<template>
  <div class="unansweredConsults">
    <vue-headful title="Hack A DOCTOR | Consultas pendientes de responder" />
    <h1>hola</h1>

    <unansweredcard :notAnswers="notAnswers" />
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

        console.log(response.data.data);

        this.notAnswers = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getNotAnswer();
  },
};
</script>

<style scoped>
</style>