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
          <span>{{notAnswer.date}}</span>
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
        <button>Responder</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "UnansweredConsultsCustom",
  props: {
    notAnswers: Array,
  },
};
</script>

<style scoped>
</style>