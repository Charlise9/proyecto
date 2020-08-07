<template>
  <div class="menu">
    <div id="nav">
      <router-link :to="{  name: 'Home' }">Home</router-link>|
      <router-link :to="{  name: 'About' }">About</router-link>|
      <router-link :to="{  name: 'Login' }">Login</router-link>
      <p>{{ username }}</p>
      <p>{{doctorname}}</p>

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
    setUserName(userId) {
      userId = getId();
      var self = this;

      const token = getAuthToken();
      axios.defaults.headers.common["Authorization"] = `${token}`;

      axios
        .get("http://localhost:3000/users/" + userId)
        .then(function (response) {
          console.log(response.data.data);
          self.username = response.data.data.name;
        })
        .catch(function (error) {
          console.error;
        });
    },
    setDoctorName(doctorId) {
      doctorId = getId();
      var self = this;

      const token = getAuthToken();
      axios.defaults.headers.common["Authorization"] = `${token}`;

      axios
        .get("http://localhost:3000/doctors/" + doctorId)
        .then(function (response) {
          console.log(response.data.data);
          self.doctorname = response.data.data.doctor.name;
        })
        .catch(function (error) {
          console.error;
        });
    },
  },
  created() {
    this.setUserName();
    this.setDoctorName();
  },
};
</script>

<style scoped>
</style>