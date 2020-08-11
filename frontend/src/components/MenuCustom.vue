<template>
  <div class="menu">
    <div id="nav">
      <router-link :to="{  name: 'Home' }">Home</router-link>
      <router-link :to="{  name: 'About' }">About</router-link>
      <router-link v-show="hide" :to="{  name: 'LoginPatient' }">Login Paciente</router-link>
      <router-link v-show="hide" :to="{  name: 'LoginDoctor' }">Login Médico</router-link>
      <router-link v-show="iAmUser" :to="{  name: 'ViewUserProfile' }">Pefil usuario</router-link>
      <router-link v-show="iAmDoctor" :to="{  name: 'ViewDoctorProfile' }">Pefil doctor</router-link>

      <p v-show="logged">{{ username }}</p>
      <!-- <p v-show="loggedDoctor">{{doctorname}}</p> -->

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
      logged: false,
      hide: true,
      iAmUser: false,
      iAmDoctor: false,
    };
  },
  methods: {
    logoutUser() {
      this.hide = true;
      logout();
      this.$router.push("/");
      setTimeout(() => {
        location.reload();
      }, 1);
    },
    /* async setUserName(userId) {userId
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

      axios
        .get("http://localhost:3000/users/" + userId)
        .then(function (response) {
          console.log(response.data.data);
          self.username = response.data.data.name;
        })
        .catch(function (error) {
          console.error;
        });
    }, */
    /* async setDoctorName(doctorId) {
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

      axios
        .get("http://localhost:3000/doctors/" + doctorId)
        .then(function (response) {
          console.log(response.data.data);
          self.doctorname = response.data.data.doctor.name;
        })
        .catch(function (error) {
          console.error;
        });
    }, */
    /* getLoginUser() {
      this.loggedPatient = isLoggedIn();
    },
    getLoginDoctor() {
      this.loggedDoctor = isLoggedIn();
    }, */

    getName() {
      this.username = localStorage.getItem("NAME");
    },
    getLogin() {
      this.logged = isLoggedIn();
      this.hide = false;
    },
    getKindOfUser() {
      const type = localStorage.getItem("KIND_OF_USER");
      console.log(type);

      if (type === "patient") {
        this.iAmUser = true;
        this.iAmDoctor = false;
      } else if (type === "doctor") {
        this.iAmDoctor = true;
        this.iAmUser = false;
      } else {
        this.iAmDoctor = false;
        this.iAmUser = false;
        this.hide = true;
      }
    },
  },
  created() {
    /* this.setUserName();
    this.setDoctorName();
    this.getLoginUser();
    this.getLoginDoctor(); */
    this.getName();
    this.getLogin();
    this.getKindOfUser();
  },
};
</script>

<style scoped>
</style>