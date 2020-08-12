<template>
  <div class="doctorprofile">
    <vue-headful title="Hack A DOCTOR | perfil-doctor" />
    <h1>DR/A {{ name }}</h1>

    <p>
      Especialidad:
      <span>{{ speciality }}</span>
    </p>
    <p>
      Correo:
      <span>{{ email }}</span>
    </p>
    <p>
      Nº de colegiado:
      <span>{{ collegiate_number }}</span>
    </p>
    <p>
      Experiencia:
      <span>{{experience}}</span>
    </p>

    <h3>Estadísticas</h3>
    <p>
      Nº de consultas:
      <span>{{ number_of_consults }}</span>
    </p>
    <p>
      Nº de respuestas:
      <span>{{ number_of_answers }}</span>
    </p>
    <p>
      Votos positivos:
      <span>{{ positives }}</span>
    </p>
    <p>
      Votos negativos:
      <span>{{ negatives }}</span>
    </p>
    <button v-show="logged">Ver historial de consultas</button>

    <router-link :to="{  name: 'SendConsult', params:{ id:id }}">
      <button>Enviar consulta</button>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";
import { isLoggedIn } from "../helpers/utils";

export default {
  name: "DoctorProfile",
  components: {},
  data() {
    return {
      id: null,
      name: "",
      email: "",
      collegiate_number: "",
      experience: "",
      speciality: "",
      image: "",
      number_of_consults: "",
      number_of_answers: "",
      positives: "",
      negatives: "",
      logged: false,
    };
  },
  methods: {
    // FUNCIÓN PARA MOSTRAR LA INFORMACIÓN DEL DOCTOR
    async doctorInfo(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS
        const response = await axios.get("http://localhost:3000/doctors/" + id);

        console.log(response.data.data);

        const doctor = response.data.data.doctor;
        const questions = response.data.data.questions;
        const statistics = response.data.data.statistics;

        this.name = doctor.name;
        this.email = doctor.email;
        this.collegiate_number = doctor.collegiate_number;
        this.experience = doctor.experience;
        this.speciality = doctor.speciality;
        this.image = doctor.image;

        this.number_of_consults = questions.number_of_consults;

        this.number_of_answers = statistics.number_of_answers;
        this.positives = statistics.positives;
        this.negatives = statistics.negatives;
      } catch (error) {
        console.log(error);
      }
    },
    getLogin() {
      this.logged = isLoggedIn();
    },
  },
  created() {
    this.doctorInfo();
    this.getLogin();
  },
};
</script>

<style scoped>
</style>