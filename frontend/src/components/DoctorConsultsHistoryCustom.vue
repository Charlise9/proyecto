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
          <span>{{ consult.date }}</span>
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

        <router-link :to="{  name: 'DoctorAnswersHistory', params:{ id:consult.consultation_id }}">
          <button>Ver respuesta</button>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DoctorConsultsHistoryCustom",
  props: {
    consults: Array,
  },
};
</script>

<style scoped>
</style>