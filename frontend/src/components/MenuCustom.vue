<template>
  <div class="menu">
    <div id="nav">
      <router-link :to="{  name: 'Home' }">Home</router-link>|
      <router-link :to="{  name: 'About' }">About</router-link>|
      <router-link :to="{  name: 'LoginPatient' }">Login Paciente</router-link>
      <router-link :to="{  name: 'LoginDoctor' }">Login Médico</router-link>

      <button @click="logoutUser()">Logout</button>
    </div>
  </div>
</template>

<script>
import { logout } from "../helpers/utils";

export default {
  name: "MenuCustom",
  data() {
    return {};
  },
  methods: {
    logoutUser() {
      logout();
      this.$router.push("/");
      location.reload();
    },
  },
};
</script>

<style scoped>
</style>