<template>
  <div>
    <patientprofile :patients="patients" />
  </div>
</template>

<script>
import patientprofile from "@/components/PatientProfileCustom.vue";
import axios from "axios";
import { getAuthToken } from "../helpers/utils";

export default {
  name: "ViewUserProfile",
  components: {
    patientprofile,
  },
  data() {
    return {
      patients: {},
    };
  },
  methods: {
    // FUNCIÓN PARA VER EL PERFIL DE USUARIO
    async getProfile(id) {
      id = this.$route.params.id;

      try {
        // LLAMADA DE AXIOS
        const response = await axios.get("http://localhost:3000/users/" + id, {
          headers: {
            Authorization: `${getAuthToken()}`,
          },
        });

        console.log(response.data.data);

        this.patients = response.data.data;
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