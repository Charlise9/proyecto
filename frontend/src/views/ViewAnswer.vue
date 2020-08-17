<template>
  <div class="viewAnswer">
    <vue-headful title="Hack A DOCTOR | Respuesta" />

    <viewanswercard :answers="answers" />
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

        /*  console.log(response.data.data); */

        this.answers = response.data.data;
      } catch (error) {
        console.log(eror);
      }
    },
  },
  created() {
    this.getAnswer();
  },
};
</script>

<style scopec>
</style>