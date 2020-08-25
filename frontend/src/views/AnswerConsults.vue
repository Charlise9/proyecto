<template>
  <div class="answerConsults">
    <h1>Responder</h1>

    <label for="Diagnosis">Diagnóstico:</label>
    <input type="text" id="Diagnosis" placeholder="Diagnóstico" v-model="diagnosis" />

    <label for="Treatment">Tratamiento:</label>
    <input type="text" id="Treatment" placeholder="Tratamiento" v-model="treatment" />

    <label for="Observations">Observaciones:</label>
    <input type="text" id="Observations" placeholder="Observaciones" v-model="observations" />

    <button class="cancel">Cancelar</button>
    <button>Responder</button>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthToken } from "../helpers/utils";

export default {
  name: "AnswerConsults",
  data() {
    return {
      diagnosis: null,
      treatment: null,
      observations: null,
    };
  },
  methods: {
    async sendAnswer(id) {
      id = this.$route.params.id;
    },
  },
};
</script>

<style scoped>
</style>