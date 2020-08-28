<template>
  <div class="viewAnswer">
    <vue-headful title="Hack A DOCTOR | Respuesta" />

    <viewanswercard :answers="answers" />

    <button @click="goBack()">Volver</button>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthToken } from "../helpers/utils";
import viewanswercard from "@/components/ViewAnswerCustom.vue";

export default {
  name: "ViewAnswer",
  components: {
    viewanswercard,
  },
  data() {
    return {
      answers: [],
      idPatient: "",
    };
  },
  methods: {
    // FUNCIÓN PARA MOSTRAR LA RESPUESTA
    async getAnswer(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS A SERVER
        const response = await axios.get(
          "http://localhost:3000/consults/answers/" + id,
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

        /* console.log(response.data.data); */

        this.answers = response.data.data;

        /* this.idPatient = response.data.data[0].patient_id; */
      } catch (error) {
        console.log(eror);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getAnswer();
  },
};
</script>

<style scopec>
</style>