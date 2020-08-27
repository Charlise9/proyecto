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

      <button @click="$emit('logout')" v-show="canLogout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuCustom",
  props: {
    username: String,
    logged: Boolean,
    hide: Boolean,
    canLogout: Boolean,
    userId: String,
    iAmUser: Boolean,
    iAmDoctor: Boolean,
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>