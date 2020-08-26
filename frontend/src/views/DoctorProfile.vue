<template>
  <div class="doctorprofile">
    <vue-headful title="Hack A DOCTOR | info-doctor" />

    <div v-if="isLoaded">
      <h1>DR/A {{ name }}</h1>

      <img class="profile" v-if="image" :src="getImageName(image)" alt="Foto de perfil" />
      <img class="profile" v-else src="@/assets/default-profile-picture.jpg" alt="Foto de perfil" />

      <p>
        Especialidad:
        <span>{{ speciality }}</span>
      </p>
      <!-- <p>
        Correo:
        <span>{{ email }}</span>
      </p>-->
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
      <spinner />
    </div>

    <div>
      <button @click="goBack()">Volver</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { isLoggedIn } from "../helpers/utils";
import { formatDistanceToNowStrict } from "date-fns";
import es from "date-fns/locale/es";
import spinner from "@/components/SpinnerCustom.vue";

export default {
  name: "DoctorProfile",
  components: {
    spinner,
  },
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

        console.log(response.data.data);

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
    // FUNCIÓN PARA VER LA IMAGEN
    getImageName(name) {
      return "http://localhost:3000/uploads/" + name;

      /* console.log(name); */
    },
    goBack() {
      this.$router.go(-1);
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