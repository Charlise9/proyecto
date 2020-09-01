<template>
  <div class="menu">
    <div id="nav">
      <div class="homeButtons">
        <router-link :to="{  name: 'Home' }">Inicio</router-link>
        <router-link :to="{  name: 'About' }">Más información</router-link>
      </div>
      <div class="profileButtons">
        <router-link v-if="hide" :to="{  name: 'LoginPatient' }">Acceso Paciente</router-link>
        <router-link v-if="hide" :to="{  name: 'LoginDoctor' }">Acceso Médico</router-link>

        <p v-if="logged">{{ username }}</p>

        <router-link
          v-if="iAmUser"
          :to="{  name: 'ViewUserProfile', params:{ id:userId} }"
        >Mi perfil</router-link>
        <router-link
          v-if="iAmDoctor"
          :to="{  name: 'ViewDoctorProfile', params:{id:userId} }"
        >Mi perfil</router-link>

        <button class="logout" @click="$emit('logout')" v-show="canLogout">Logout</button>
      </div>
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

.logout {
  background-color: red;
  color: black;
}
</style>