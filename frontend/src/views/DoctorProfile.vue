<template>
  <div class="doctorprofile">
    <vue-headful title="Hack A DOCTOR | info-doctor" />

    <div v-if="isLoaded">
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
        <span>{{getFormat(experience)}}</span>
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

      <router-link :to="{  name: 'DoctorConsultsHistory', params:{ id:doctorId }}">
        <button v-show="logged">Ver historial de consultas</button>
      </router-link>

      <router-link :to="{  name: 'SendConsult', params:{ id:doctorId }}">
        <button>Enviar consulta</button>
      </router-link>
    </div>

    <div v-else>
      <div class="loader">Cargando...</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { isLoggedIn } from "../helpers/utils";
import { formatDistanceToNowStrict } from "date-fns";
import es from "date-fns/locale/es";

export default {
  name: "DoctorProfile",
  components: {},
  data() {
    return {
      /* id: null, */
      doctorId: "",
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
      formatDistanceToNowStrict,
      isLoaded: false,
    };
  },
  methods: {
    // FUNCIÓN PARA MOSTRAR LA INFORMACIÓN DEL DOCTOR
    async doctorInfo(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS
        const response = await axios.get("http://localhost:3000/doctors/" + id);

        /* console.log(response.data.data); */

        const doctor = response.data.data.doctor;
        const questions = response.data.data.questions;
        const statistics = response.data.data.statistics;

        this.doctorId = doctor.id;
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

        this.isLoaded = true;
      } catch (error) {
        console.log(error);
      }
    },
    getLogin() {
      this.logged = isLoggedIn();
    },
    getFormat(date) {
      return this.formatDistanceToNowStrict(new Date(date), {
        locale: es,
      });
    },
  },
  created() {
    this.doctorInfo();
    this.getLogin();
  },
};
</script>

<style scoped>
.loader {
  font-size: 10px;
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: #422163;
  background: -moz-linear-gradient(left, #422163 10%, rgba(66, 33, 99, 0) 42%);
  background: -webkit-linear-gradient(
    left,
    #422163 10%,
    rgba(66, 33, 99, 0) 42%
  );
  background: -o-linear-gradient(left, #422163 10%, rgba(66, 33, 99, 0) 42%);
  background: -ms-linear-gradient(left, #422163 10%, rgba(66, 33, 99, 0) 42%);
  background: linear-gradient(to right, #422163 10%, rgba(66, 33, 99, 0) 42%);
  position: relative;
  -webkit-animation: load3 1.4s infinite linear;
  animation: load3 1.4s infinite linear;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader:before {
  width: 50%;
  height: 50%;
  background: #422163;
  border-radius: 100% 0 0 0;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
}
.loader:after {
  background: #e2e9e8;
  width: 75%;
  height: 75%;
  border-radius: 50%;
  content: "";
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
@-webkit-keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load3 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>