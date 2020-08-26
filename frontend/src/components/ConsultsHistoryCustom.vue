<template>
  <div>
    <ul>
      <li v-for="consult in consults" :key="consult.id">
        <p>
          Código de consulta:
          <span>{{ consult.consultation_id }}</span>
        </p>
        <p>
          Paciente que realizó la consulta:
          <span>{{ consult.consult_patient }}</span>
        </p>
        <p>
          Fecha:
          <span>{{ getFormat(consult.date) }}</span>
        </p>
        <p>
          Dirigida al doctor/a:
          <span>{{consult.doctor_name}}</span>
        </p>
        <p>
          Especialista en:
          <span>{{consult.speciality}}</span>
        </p>
        <p>
          Gravedad:
          <span>{{ consult.seriusness }}</span>
        </p>
        <p>
          Síntomas:
          <span>{{ consult.symptoms }}</span>
        </p>
        <p>
          Antecedentes médicos:
          <span>{{ consult.medical_history }}</span>
        </p>
        <p>
          Descripción:
          <span>{{ consult.description }}</span>
        </p>
        <p>
          Foto adjunta:
          <span>{{ consult.image }}</span>
        </p>
        <p>
          Archivo adjunto:
          <span>{{ consult.document }}</span>
        </p>
        <p>
          Código de respuesta:
          <span>{{ consult.answer_id }}</span>
        </p>

        <router-link :to="{  name: 'ViewAnswer', params:{ id:consult.answer_id }}">
          <button>Ver respuesta</button>
        </router-link>
      </li>
    </ul>

    <button @click="goBack()">Volver</button>
  </div>
</template>

<script>
import { format } from "date-fns";

export default {
  name: "ConsultsHistoryCustom",
  props: {
    consults: Array,
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
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>