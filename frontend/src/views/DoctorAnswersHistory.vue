<template>
  <div class="doctorsAnswersHistory">
    <vue-headful title="Hack A DOCTOR | Respuesta" />

    <h1>Hola</h1>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DoctorAnswersHistory",
  data() {
    return {
      answers: [],
    };
  },
  methods: {
    // FUNCIÓN PARA MOSTRAR LA RESPUESTA
    async getAnswer() {},
  },
};
</script>

<style scopec>
</style>