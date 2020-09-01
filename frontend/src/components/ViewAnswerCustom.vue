<template>
  <div>
    <div id="list">
      <ul>
        <li v-for="answer in answers" :key="answer.id">
          <p>
            <b>Respuesta nº:</b>
            <span>{{ answer.answer_id }}</span>
          </p>
          <p>
            <b>Realizada por el Dr./a.:</b>
            <span>{{ answer.doctor_name}}</span>
          </p>
          <p>
            <b>Especialista en:</b>
            <span>{{ answer.speciality}}</span>
          </p>
          <p>
            <b>En la fecha:</b>
            <span>{{getFormat(answer.date)}}</span>
          </p>
          <p>
            <b>Al paciente:</b>
            <span>{{answer.patient_name}}</span>
          </p>
          <p>
            <b>En relación a la consulta nº:</b>
            <span>{{answer.consult_id}}</span>
          </p>
          <p>
            <b>DIAGNÓSTICO:</b>
            <span>{{answer.diagnosis}}</span>
          </p>
          <p>
            <b>TRATAMIENTO:</b>
            <span>{{answer.treatment}}</span>
          </p>
          <p>
            <b>OBSERVACIONES:</b>
            <span>{{answer.observations}}</span>
          </p>
          <p>
            <b>¿Fue efectivo el tratamiento?:</b>
            <span>{{rateFormat(answer.rate)}}</span>
          </p>

          <router-link v-if="canVote" :to="{  name: 'VoteAnswer', params:{ id:answer.answer_id }}">
            <button>Votar respuesta</button>
          </router-link>
        </li>
      </ul>
    </div>
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
  },
};
</script>

<style scoped>
#list {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.75rem;
}

#list ul {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 900px;
}

#list ul li {
  border: 2px solid #07689f;
  border-radius: 15px;
  margin: 2rem auto;
  display: block;
  padding: 1rem;
  width: 27rem;
  height: 27rem;
  background-color: #e4f9ff;
}
#list ul li p {
  display: block;
  padding: 0.3rem;
  font-size: 1rem;
}

#list ul li p span {
  margin-left: 0.3rem;
  font-size: 1rem;
}
</style>