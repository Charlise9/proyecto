<template>
  <div class="answerConsults">
    <vue-headful title="e-DOCTOR | Responder consulta" />

    <h1>Responder</h1>

    <label for="Diagnosis">Diagnóstico:</label>
    <input type="text" id="Diagnosis" placeholder="Diagnóstico" v-model="diagnosis" />

    <label for="Treatment">Tratamiento:</label>
    <input type="text" id="Treatment" placeholder="Tratamiento" v-model="treatment" />

    <label for="Observations">Observaciones:</label>
    <input type="text" id="Observations" placeholder="Observaciones" v-model="observations" />

    <div class="buttons">
      <button class="cancel" @click="goBack()">Cancelar</button>
      <button @click="sweetalertAnswer()">Responder</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getAuthToken } from "../helpers/utils";
import Swal from "sweetalert2";

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
    sweetalertAnswer() {
      Swal.fire({
        text: "Vas a enviar una respuesta, ¿estás seguro?",
        icon: "question",
        confirmButtonText: "Sí",
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            title: "¡RESPUESTA ENVIADA!",
            icon: "success",
            confirmButtonText: "Ok",
            onClose: () => {
              this.sendAnswer();
              this.$router.push({ name: "UnansweredConsults" });
            },
          });
        }
      });
    },

    async sendAnswer(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS
        const response = await axios.post(
          `http://localhost:3000/consults/${id}/answers/`,
          {
            diagnosis: this.diagnosis,
            treatment: this.treatment,
            observations: this.observations,
          },
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

        console.log(response.data.data);

        /* this.$router.push("/viewdoctorprofile/:id/unanswered-consults/"); */
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.answerConsults {
  position: relative;
  min-height: 85vh;
}

.answerConsults:before {
  background-image: url("../assets/consult-wallpaper.jpg");
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