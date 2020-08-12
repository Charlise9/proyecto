<template>
  <div>
    <doctorprofile :doctors="doctors" :questions="questions" :statistics="statistics" />
  </div>
</template>

<script>
import doctorprofile from "@/components/DoctorProfileCustom.vue";
import axios from "axios";
import { getAuthToken } from "../helpers/utils";

export default {
  name: "ViewDoctorProfile",
  components: {
    doctorprofile,
  },
  data() {
    return {
      doctors: {},
      questions: {},
      statistics: {},
    };
  },
  methods: {
    // FUNCIÓN PARA VER EL PERFIL DE USUARIO
    async getProfile(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS
        const response = await axios.get(
          "http://localhost:3000/doctors/" + id,
          {
            headers: {
              Authorization: `${getAuthToken()}`,
            },
          }
        );

        console.log(response.data.data);

        this.doctors = response.data.data.doctor;
        this.questions = response.data.data.questions;
        this.statistics = response.data.data.statistics;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style scoped>
</style>