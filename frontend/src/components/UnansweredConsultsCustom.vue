<template>
  <div>
    <ul>
      <li v-for="notAnswer in notAnswers" :key="notAnswer.id">
        <p>
          Consulta nº:
          <span>{{notAnswer.id}}</span>
        </p>
        <p>
          Paciente:
          <span>{{notAnswer.consult_patient}}</span>
        </p>
        <p>
          Fecha:
          <span>{{getFormat(notAnswer.date)}}</span>
        </p>
        <p>
          Gravedad:
          <span>{{notAnswer.seriusness}}</span>
        </p>
        <p>
          SÍNTOMAS:
          <span>{{notAnswer.symptoms}}</span>
        </p>
        <p>
          ANTECEDENTES CLÍNICOS:
          <span>{{notAnswer.medical_history}}</span>
        </p>
        <p>
          DESCRIPCIÓN:
          <span>{{notAnswer.description}}</span>
        </p>
        <p>
          Imagen adjunta:
          <span>{{notAnswer.image}}</span>
        </p>
        <p>
          Documento adjunto:
          <span>{{notAnswer.document}}</span>
        </p>

        <router-link :to="{  name: 'AnswerConsults', params:{ id:notAnswer.id }}">
          <button>Responder</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "UnansweredConsultsCustom",
  props: {
    notAnswers: Array,
  },
  data() {
    return {
      format,
    };
  },
  methods: {
    getFormat(date) {
      return this.format(new Date(date), "dd-MM-yyyy  HH:mm");
    },
  },
};
</script>

<style scoped>
</style>