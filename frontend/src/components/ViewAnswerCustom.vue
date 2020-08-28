<template>
  <div>
    <ul>
      <li v-for="answer in answers" :key="answer.id">
        <p>
          Respuesta nº:
          <span>{{ answer.answer_id }}</span>
        </p>
        <p>
          Realizada por el Dr./a.:
          <span>{{ answer.doctor_name}}</span>
        </p>
        <p>
          Especialista en:
          <span>{{ answer.speciality}}</span>
        </p>
        <p>
          En la fecha:
          <span>{{getFormat(answer.date)}}</span>
        </p>
        <p>
          Al paciente:
          <span>{{answer.patient_name}}</span>
        </p>
        <p>
          En relación a la consulta nº:
          <span>{{answer.consult_id}}</span>
        </p>
        <p>
          DIAGNÓSTICO:
          <span>{{answer.diagnosis}}</span>
        </p>
        <p>
          TRATAMIENTO:
          <span>{{answer.treatment}}</span>
        </p>
        <p>
          OBSERVACIONES:
          <span>{{answer.observations}}</span>
        </p>
        <p>
          ¿Fue efectivo el tratamiento?:
          <span>{{rateFormat(answer.rate)}}</span>
        </p>
        <p>
          Resultado verificado:
          <span>{{answer.verified}}</span>
        </p>

        <router-link v-if="canVote" :to="{  name: 'VoteAnswer', params:{ id:answer.answer_id }}">
          <button>Votar respuesta</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "ViewAnswerCustom.vue",
  props: {
    answers: Array,
    idPatient: String,
  },
  data() {
    return {
      format,
    };
  },
  computed: {
    canVote() {
      const idUser = localStorage.getItem("ID");
      console.log(idUser);
      return this.answers[0].patient_id === parseInt(idUser);
    },
  },
  methods: {
    getFormat(date) {
      return this.format(new Date(date), "dd-MM-yyyy  HH:mm");
    },
    rateFormat(vote) {
      if (vote === 0) {
        return "Negativo";
      } else {
        return "Positivo";
      }
    },
    /* voteAnswer(index) {
      const idUser = localStorage.getItem("ID");
      if (this.answers[index].patient_id === idUser) {
        this.canVote = true;
      } else {
        this.canVote = false;
      }
    }, */

    /* canVote(index) {
      const idUser = localStorage.getItem("ID");
      return this.answers[index].patient_id === idUSer;
    }, */
  },

  created() {
    /* this.voteAnswer(); */
  },
};
</script>

<style scoped>
</style>