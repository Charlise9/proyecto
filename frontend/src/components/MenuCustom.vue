<template>
  <div class="menu">
    <div id="nav">
      <router-link :to="{  name: 'Home' }">Home</router-link>
      <router-link :to="{  name: 'About' }">About</router-link>
      <router-link :to="{  name: 'LoginPatient' }">Login Paciente</router-link>
      <router-link :to="{  name: 'LoginDoctor' }">Login Médico</router-link>
      <p v-show="logged">{{ username }}</p>
      <p v-show="logged">{{doctorname}}</p>

      <button @click="logoutUser()">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { logout, getId, getAuthToken, isLoggedIn } from "../helpers/utils";

export default {
  name: "MenuCustom",
  data() {
    return {
      userId: "",
      doctorId: "",
      username: "",
      doctorname: "",
      logged: false,
    };
  },
  methods: {
    logoutUser() {
      logout();
      this.$router.push("/");
      location.reload();
    },
    async setUserName(userId) {
      userId = getId();

      const token = getAuthToken();
      axios.defaults.headers.common["Authorization"] = `${token}`;

      try {
        const response = await axios.get(
          "http://localhost:3000/users/" + userId
        );

        console.log(response.data.data);

        this.username = response.data.data.name;
      } catch (error) {
        console.error;
      }

      /* axios
        .get("http://localhost:3000/users/" + userId)
        .then(function (response) {
          console.log(response.data.data);
          self.username = response.data.data.name;
        })
        .catch(function (error) {
          console.error;
        }); */
    },
    async setDoctorName(doctorId) {
      doctorId = getId();

      const token = getAuthToken();
      axios.defaults.headers.common["Authorization"] = `${token}`;

      try {
        const response = await axios.get(
          "http://localhost:3000/doctors/" + doctorId
        );

        console.log(response.data.data);

        this.doctorname = response.data.data.doctor.name;
      } catch (error) {
        console.error;
      }

      /* axios
        .get("http://localhost:3000/doctors/" + doctorId)
        .then(function (response) {
          console.log(response.data.data);
          self.doctorname = response.data.data.doctor.name;
        })
        .catch(function (error) {
          console.error;
        }); */
    },
    getLogin() {
      this.logged = isLoggedIn();
    },
  },
  created() {
    this.setUserName();
    this.setDoctorName();
    this.getLogin();
  },
};
</script>

<style scoped>
</style>