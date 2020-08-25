<template>
  <div class="menu">
    <div id="nav">
      <router-link :to="{  name: 'Home' }">Inicio</router-link>
      <router-link :to="{  name: 'About' }">Más información</router-link>
      <router-link v-if="hide" :to="{  name: 'LoginPatient' }">Acceso Paciente</router-link>
      <router-link v-if="hide" :to="{  name: 'LoginDoctor' }">Acceso Médico</router-link>
      <router-link v-if="iAmUser" :to="{  name: 'ViewUserProfile', params:{ id:userId} }">Mi perfil</router-link>
      <router-link
        v-if="iAmDoctor"
        :to="{  name: 'ViewDoctorProfile', params:{id:userId} }"
      >Mi perfil</router-link>

      <p v-if="logged">{{ username }}</p>
      <!-- <p v-show="loggedDoctor">{{doctorname}}</p> -->

      <button @click="logoutUser()" v-show="canLogout">Logout</button>
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
      canLogout: false,
    };
  },
  methods: {
    logoutUser() {
      this.hide = true;
      this.canLogout = false;
      logout();
      this.$router.push("/");
      setTimeout(() => {
        location.reload();
      }, 1);
    },

    getUserId() {
      this.userId = getId();
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
      this.canLogout = true;
    },
    getKindOfUser() {
      const type = localStorage.getItem("KIND_OF_USER");
      /* console.log(type); */

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
        this.canLogout = false;
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
    this.getUserId();
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>